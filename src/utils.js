import differenceInDays from 'date-fns/differenceInDays';
import isSameDay from 'date-fns/isSameDay';
import max from 'date-fns/max';
import min from 'date-fns/min';
import moment from 'moment';

export const travelTypes = {
    'Outside': 2,
    'Inside': 1
}

export function sortTravelChecks(travelChecks){
    let newList = Array.from(travelChecks)
    newList.sort((a,b) => moment(a.date) - moment(b.date))
    return newList
}

export function sumTravelDays(travelsList, travelTypesFilter){

    const selectedTravels = travelsList.filter((t) => t['durationDateWindow'] > 0)

    if (selectedTravels.length < 1){
        return 0
    }

    const allDatesInSelection = selectedTravels.map((t) => t.start).concat(selectedTravels.map((t) => t.end))
    const extraneousDays = allDatesInSelection.sort().map((d, i) => {
        if (i < allDatesInSelection.length - 1){
            return isSameDay(d, allDatesInSelection[i + 1]) ? 1 : 0
        } return 0
     } ).reduce((a,b) => a + b)

     let travelCountList = selectedTravels.map((t, i) => t['durationDateWindow'])
     console.log(travelCountList, extraneousDays)

     if (travelTypesFilter !== undefined){
        travelCountList = selectedTravels.filter((t) => t['group'] === travelTypes[travelTypesFilter]).map(t => t['durationDateWindow'] )
     }
     console.log(travelCountList, extraneousDays)
     return travelCountList.reduce((a,b) => a + b, - extraneousDays)
}


export function sumTravelDaysOutside(travelsList){
    return sumTravelDays(travelsList, 'Outside')
}

export function sumTravelDaysInside(travelsList){
    return sumTravelDays(travelsList, 'Inside')
}

export function processRawInput(rawInput, processingFunction='i94'){
    switch(processingFunction){
        case 'i94':
            var parsedOutput = rawInput.match(/((\S+){3})/g).slice(3);
            var items = []
            while (parsedOutput.length > 0) {
                items.push({
                    location: parsedOutput.pop(),
                    type: parsedOutput.pop() === 'Departure' ? 'DEP' : 'ARR',
                    date: new moment(parsedOutput.pop())
                });
            }
            return items
        default:
            return []
    }
}

export function computeTravelDurationDays(dateStart, dateStop, dateWindowStart, dateWindowStop){
    const dateStartD = moment(dateStart)._d
    const dateStopD = moment(dateStop)._d
    const dateWindowStartD = moment(dateWindowStart)._d
    const dateWindowStopD = moment(dateWindowStop)._d

    if (dateWindowStart === undefined || dateWindowStop === undefined){
        return Math.abs(differenceInDays(dateStartD, dateStopD)) + 1
    }
    if(dateStartD >= dateWindowStopD || dateStopD <= dateWindowStartD){
        return 0
    }

    return differenceInDays(
        min([dateWindowStopD, dateStopD]),
        max([dateWindowStartD, dateStartD])
    ) + 1
}

export function travelChecksToTravelsList(travelChecks, dateWindowStart, dateWindowStop){
    // travelChecks looks like
    // { location: 'JFK', type: 'DEP' or 'ARR', date: '2020-03-20'
    // Returns something like
    // { id: 1, type: "point", title: "loul", content: "Departure from JFK", start: new Date(2013, 5, 20) }

    if(travelChecks.length < 1){
        return {travels: [], message: 'No travel checks yet'}
    }

    // Sort the travel check by date
    let newTravelChecks = sortTravelChecks(travelChecks).reverse()
    let travels = []

    // Add the time window start and stop as travel checks if they are outside the travels
    if(new Date(dateWindowStop) > new Date(newTravelChecks[0].date)){

        newTravelChecks.unshift({
            location: newTravelChecks[0].type === 'DEP' ? 'USA' : 'Abroad',
            type: newTravelChecks[0].type === 'DEP' ? 'ARR' : 'DEP',
            date: dateWindowStop,
            isAdditionalDateWindowStopCheck: true
        })
    }
    if(new Date(dateWindowStart) < new Date(newTravelChecks[newTravelChecks.length - 1].date)){
        newTravelChecks.push({
            location: newTravelChecks[newTravelChecks.length - 1].type === 'DEP' ? 'USA' : 'Abroad',
            type: newTravelChecks[newTravelChecks.length - 1].type === 'DEP' ? 'ARR' : 'DEP',
            date: dateWindowStart,
            isAdditionalDateWindowStartCheck: true
        })
    }

    // Browse the list, element by element
    let newTravel = {}
    let checkA, checkB, travelTitle, travelDurationDateWindow, travelDurationNoDateWindow
    let index = 0
    let errors = []
    while(newTravelChecks.length > 1){
        checkA = newTravelChecks.pop(0)
        checkB = newTravelChecks[newTravelChecks.length - 1]

        travelDurationDateWindow = computeTravelDurationDays(checkA.date, checkB.date, dateWindowStart, dateWindowStop)
        travelDurationNoDateWindow = computeTravelDurationDays(checkA.date, checkB.date)

        // Build the travel title
        travelTitle = `From ${checkA['location']} to ${checkB['location']}: ${travelDurationDateWindow} days`
        if (travelDurationNoDateWindow - travelDurationDateWindow > 0){
            travelTitle = `${travelTitle} (${travelDurationNoDateWindow - travelDurationDateWindow} days outside selected period)`
        }

        // Create a new travel object
        newTravel = {
            id: index,
            type: "range",
            title: travelTitle,
            content: `From ${checkA['location']} to ${checkB['location']}: ${travelDurationDateWindow} days`,
            start: checkA.date,
            end: checkB.date,
            duration: travelDurationNoDateWindow,
            durationDateWindow: travelDurationDateWindow
        }

        if (checkA.type === 'DEP' && checkB.type === 'ARR') {
            index++
            newTravel['group'] = travelTypes['Outside'] // Outside
            travels.push(newTravel)
        }else if(checkA.type === 'ARR' && checkB.type === 'DEP'){
            index++
            newTravel['group'] = travelTypes["Inside"] // Inside
            travels.push(newTravel)
        }else{
            errors.push({
                travelChecks: [checkA, checkB],
                message: `should be consecutive Arrivals and Departures`
            })
        }
    }

    return {travels: travels, errors: errors}

}