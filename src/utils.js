import differenceInDays from 'date-fns/differenceInDays';
import isSameDay from 'date-fns/isSameDay';
import max from 'date-fns/max';
import min from 'date-fns/min';
import moment from 'moment';

export function sortTravelChecks(travelChecks){
    let newList = Array.from(travelChecks)
    newList.sort((a,b) => a.date - b.date)
    return newList
}

export function sumTravelDays(travelsList){
    if (travelsList.length < 1){
        return 0
    }
    const allDates = travelsList.map((t) => t.start).concat(travelsList.map((t) => t.end))
    const extraneousDays = allDates.sort().map((v, i) => i < allDates.length - 1 ? (isSameDay(v, allDates[i + 1]) ? 1 : 0) : 0 ).reduce((a,b) => a + b)
    return Math.round(travelsList.map((a) => a['durationDateWindow']).reduce((a,b) => a + b, 0) - extraneousDays)
}

export function sumTravelDaysOutside(travelsList){
    return sumTravelDays(travelsList.filter((t) => t['group'] === 2))
}

export function sumTravelDaysInside(travelsList){
    return sumTravelDays(travelsList.filter((t) => t['group'] === 1))
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

    // console.log(dateStart, dateStop, dateWindowStart, dateWindowStop)
    // console.log(dateStartD, dateStopD, dateWindowStartD, dateWindowStopD)

    if (dateWindowStart === undefined || dateWindowStop === undefined){
        // return Math.round(Math.abs(new Date(dateStop) - new Date(dateStart)) / 1000 / 3600 / 24) + 1
        return Math.abs(differenceInDays(dateStartD, dateStopD)) + 1
    }
    if(dateStartD >= dateWindowStopD || dateStopD <= dateWindowStartD){
        return 0
    }

    // return Math.round(new Date(Math.min(new Date(dateWindowStop), new Date(dateStop))) - new Date(Math.max(new Date(dateWindowStart), new Date(dateStart)))) / 1000 / 3600 / 24 + 1
    // console.log(differenceInDays(
    //     min([dateWindowStopD, dateStopD]),
    //     max([dateWindowStartD, dateStartD])
    // ))

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
            // date: new Intl.DateTimeFormat("en-US").format(new Date(dateWindowStop))
            date: dateWindowStop,
            isAdditionalDateWindowStopCheck: true
        })
    }
    if(new Date(dateWindowStart) < new Date(newTravelChecks[newTravelChecks.length - 1].date)){
        newTravelChecks.push({
            location: newTravelChecks[newTravelChecks.length - 1].type === 'DEP' ? 'USA' : 'Abroad',
            type: newTravelChecks[newTravelChecks.length - 1].type === 'DEP' ? 'ARR' : 'DEP',
            // date: new Intl.DateTimeFormat("en-US").format(new Date(dateWindowStart)),
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
        // If the travel is completing a time window, its message will be updated
        // if (checkA['isAdditionalDateWindowStartCheck']){
        //     travelTitle = `${travelTitle} <br /> (New travel added to fill space between the beginning of the selected period and the first travel)`
        // }
        // if (checkB['isAdditionalDateWindowStopCheck']){
        //     travelTitle = `${travelTitle} <br /> (New travel added to fill space between the last travel and the end of the selected period)`
        // }

        // Create a new travel object
        newTravel = {
            id: index,
            type: "range",
            title: travelTitle,
            content: `From ${checkA['location']} to ${checkB['location']}: ${travelDurationDateWindow} days`,
            // start: new Intl.DateTimeFormat("en-US").format(new Date(checkA.date)),
            start: checkA.date,
            // end: new Intl.DateTimeFormat("en-US").format(new Date(checkB.date)),
            end: checkB.date,
            duration: travelDurationNoDateWindow,
            durationDateWindow: travelDurationDateWindow
        }

        if (checkA.type === 'DEP' && checkB.type === 'ARR') {
            index++
            newTravel['group'] = 2 // Outside
            travels.push(newTravel)
        }else if(checkA.type === 'ARR' && checkB.type === 'DEP'){
            index++
            newTravel['group'] = 1 // Inside
            travels.push(newTravel)
        }else{
            console.log(checkA.date)
            // message = `${message} Travel checks <b>${moment(checkA.date).format('YYYY/MM/DD')}</b> at <b>${checkA.location}</b>`
            // message = `${message} and ${moment(checkA.date).format('YYYY/MM/DD')} at ${checkA.location}`
            // message = 
            errors.push({
                travelChecks: [checkA, checkB],
                message: `should be consecutive Departures and Arrivals`
            })
        }
    }

    return {travels: travels, errors: errors}

}