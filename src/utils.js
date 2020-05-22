import moment from 'moment';
import XLSX from 'xlsx';
import FileSaver from 'file-saver';

export const travelTypes = {
    'Outside': 2,
    'Inside': 1
}

export function sortTravelChecks(travelChecks){
    let newList = Array.from(travelChecks)
    newList.sort((a,b) => moment(a.date) - moment(b.date))
    return newList
}

export function sumTravelDaysInside(travelsList){

    const selectedTravels = travelsList.filter((t) => t['group'] === travelTypes["Inside"])

    if (selectedTravels.length < 1){
        return 0
    }

     return selectedTravels.map((t) => t['durationDateWindow']).reduce((a,b) => a + b, 0)
}

export function processRawInput(rawInput, processingFunction){
    let results = []
    let parsedOutput = []

    switch(processingFunction){
        case 'i94':
            parsedOutput = rawInput.match(/((\S+){3})/g);

            // Remove unwanted keywords if any
            parsedOutput.splice(parsedOutput.indexOf("Date"), 1)
            parsedOutput.splice(parsedOutput.indexOf("Type"), 1)
            parsedOutput.splice(parsedOutput.indexOf("Location"), 1)

            function departureOrArrivalI94(s){
                return s === 'Departure' ? 'DEP' : (s === 'Arrival' ? 'ARR' : null)
            }
            while (parsedOutput.length > 0) {
                results.push({
                    location: parsedOutput.pop(),
                    type: departureOrArrivalI94(parsedOutput.pop()),
                    date: parsedOutput.pop()
                });
            }
        break;
        case 'tabular':
            parsedOutput = rawInput.match(/[\S ]+/g).map((a) => a.trim()).filter((a) => a.length > 0);
            // Remove unwanted keywords if any
            parsedOutput.splice(parsedOutput.indexOf("date"), 1)
            parsedOutput.splice(parsedOutput.indexOf("type"), 1)
            parsedOutput.splice(parsedOutput.indexOf("location"), 1)
            parsedOutput.splice(parsedOutput.indexOf("tableData"), 1)
            console.log(parsedOutput);

            while (parsedOutput.length > 0) {
                results.push({
                    type: parsedOutput.pop(),
                    location: parsedOutput.pop(),
                    date: parsedOutput.pop(),
                });
            }
        break;
        default:
            console.error('No processing function found.')
    }

    // Filter and only keep valid items
    console.log(results.map( (tc) => moment(tc["date"], 'YYYY-MM-DD').isValid() ? 'ok' : tc["date"]  ));
    results = results.filter( (tc) => (tc["type"] === 'DEP' || tc["type"] === 'ARR') & moment(tc["date"]).isValid() )

    // Format the dates
    return results.map((tc) => {
        return {
            date: dateToDateString(moment(tc["date"])),
            location: tc["location"],
            type: tc["type"]
        }
    })
}

export function dateStringToDate(dateStr){
    if(dateStr === undefined){
        return undefined
    }
    return new moment(dateStr);
}

export function dateToDateString(date){
    return moment(date).format('YYYY-MM-DD')
}

export function computeTravelDurationDays(dateStart, dateStop, dateWindowStart, dateWindowStop){
    const dateStartD = dateStringToDate(dateStart)
    const dateStopD = dateStringToDate(dateStop)
    const dateWindowStartD = dateStringToDate(dateWindowStart)
    const dateWindowStopD = dateStringToDate(dateWindowStop)

    if (dateWindowStart === undefined || dateWindowStop === undefined){
        return Math.abs(dateStopD.diff(dateStartD, 'days')) + 1
    }
    if(dateStartD >= dateWindowStopD || dateStopD <= dateWindowStartD){
        return 0
    }

    return moment.min(dateWindowStopD, dateStopD).diff(moment.max(dateWindowStartD, dateStartD), 'days') + 1
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

export function exportXls(columns, csvData){
    // Used here:
    // https://github.com/mbrn/material-table/blob/3499b134c2b2ac08b54cfec4fe6bc406108beac1/src/components/m-table-toolbar.js#L50
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileName = 'dataExport';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
}
