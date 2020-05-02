import { travelTypes } from "../utils";
import moment from "moment";

test('dummy', () => {
    expect(0).toBe(0);
  });

  export const invalidTabularRawInput = `
  Date	Location	Type
  Thu Mar 30 2017 00:00:00 GMT-0400	Unavailable	rrival
  Wed Oct 09 2019 00:00:00 GMT-0400	WAS	Departure$
  
  `
  
  export const validTabularRawInput = `
  Date	Location	Type
  Wed Oct 09 2019 00:00:00 GMT-0400	WAS	Departure
  Thu Mar 30 2017 00:00:00 GMT-0400	Unavailable	Arrival
 `     

export const invalidI94RawInput = `
Fri Apr 13 2018 00:00:00 GMT-0400	WAS	Deprture
Wed Apr 25 2018 00:00:00 GMT-0400	DBL	Arr
`

export const validI94RawInput = `
Date
	
Type
	
Location
1 	
2019-10-09
	
Departure
	
WAS
10 	
2017-03-30
	
Arrival
	
Unavailable
`

export const validParsedInput = [
    {
        "date": "2017-03-30",
        "location": "Unavailable",
        "type": "ARR"
    },
    {
        "date": "2019-10-09",
        "location": "WAS",
        "type": "DEP"
    }
]

export const validTravelChecksUnordered = [
    {
        "location": "DLA",
        "type": "ARR",
        "date": "2017-05-30",
    },
    {
        "location": "RRA",
        "type": "ARR",
        "date": "2017-03-30",
    },
    {
        "location": "DUL",
        "type": "DEP",
        "date": "2017-06-30",
    },
    {
        "location": "BWI",
        "type": "DEP",
        "date": "2017-03-31",
    }]

export const validTravelChecksOrdered = [
    {
        "location": "RRA",
        "type": "ARR",
        "date": "2017-03-30",
    },
    {
        "location": "BWI",
        "type": "DEP",
        "date": "2017-03-31",
    },
    {
        "location": "DLA",
        "type": "ARR",
        "date": "2017-05-30",
    },
    {
        "location": "DUL",
        "type": "DEP",
        "date": "2017-06-30",
    },
]

export const validTravelsNoTimeWindow = [
    {
        id: 0,
        type: "range",
        title: `From RRA to BWI: 2 days`,
        content: `From RRA to BWI: 2 days`,
        start: "2017-03-30",
        end: "2017-03-31",
        group: travelTypes["Inside"],
        duration: 2,
        durationDateWindow: 2
    },
    {
        id: 1,
        type: "range",
        title: `From BWI to DLA: 61 days`,
        content: `From BWI to DLA: 61 days`,
        start: "2017-03-31",
        end: "2017-05-30",
        group: travelTypes["Outside"],
        duration: 61,
        durationDateWindow: 61
    },
    {
        id: 2,
        type: "range",
        title: `From DLA to DUL: 32 days`,
        content: `From DLA to DUL: 32 days`,
        start: "2017-05-30",
        end: "2017-06-30",
        group: travelTypes["Inside"],
        duration: 32,
        durationDateWindow: 32
    }
]

export const validTotalDaysCountNoTimeWindow = {
    'Inside': 34,
    'Outside': 59,
    'Total':  93
}


export const testTravelsTimeWindows = [
    {
        dateWindowStart: "2017-01-01",
        dateWindowStop: "2017-04-15",
        travels: [
            {
                "id": 0,
                "content": "From Abroad to RRA: 89 days",
                "duration": 89,
                "durationDateWindow": 89,
                "end": "2017-03-30",
                "group": travelTypes["Outside"],
                "start": "2017-01-01",
                "title": "From Abroad to RRA: 89 days",
                "type": "range",
            },
            {
                id: 1,
                type: "range",
                title: `From RRA to BWI: 2 days`,
                content: `From RRA to BWI: 2 days`,
                start: "2017-03-30",
                end: "2017-03-31",
                group: travelTypes["Inside"],
                duration: 2,
                durationDateWindow: 2
            },
            {
                id: 2,
                type: "range",
                title: `From BWI to DLA: 16 days (45 days outside selected period)`,
                content: `From BWI to DLA: 16 days`,
                start: "2017-03-31",
                end: "2017-05-30",
                group: travelTypes["Outside"],
                duration: 61,
                durationDateWindow: 16
            },
            {
                id: 3,
                type: "range",
                title: `From DLA to DUL: 0 days (32 days outside selected period)`,
                content: `From DLA to DUL: 0 days`,
                start: "2017-05-30",
                end: "2017-06-30",
                group: travelTypes["Inside"],
                duration: 32,
                durationDateWindow: 0
            }
    ],
    totalDaysCount: {
        'Inside': 2,
        'Outside': 103,
        'Total':  105
    }
},
{
    dateWindowStart: "2017-04-20",
    dateWindowStop: "2017-12-31",
    travels: [
        {
            id: 0,
            type: "range",
            title: `From RRA to BWI: 0 days (2 days outside selected period)`,
            content: `From RRA to BWI: 0 days`,
            start: "2017-03-30",
            end: "2017-03-31",
            group: travelTypes["Inside"],
            duration: 2,
            durationDateWindow: 0
        },
        {
            id: 1,
            type: "range",
            title: `From BWI to DLA: 41 days (20 days outside selected period)`,
            content: `From BWI to DLA: 41 days`,
            start: "2017-03-31",
            end: "2017-05-30",
            group: travelTypes["Outside"],
            duration: 61,
            durationDateWindow: 41
        },
        {
            id: 2,
            type: "range",
            title: `From DLA to DUL: 32 days`,
            content: `From DLA to DUL: 32 days`,
            start: "2017-05-30",
            end: "2017-06-30",
            group: travelTypes["Inside"],
            duration: 32,
            durationDateWindow: 32
        },
        {
            "id": 3,
            "content": "From DUL to USA: 185 days",
            "duration": 185,
            "durationDateWindow": 185,
            "end": "2017-12-31",
            "group": travelTypes["Outside"],
            "start": "2017-06-30",
            "title": "From DUL to USA: 185 days",
            "type": "range",
        },
],
totalDaysCount: {
    'Inside': 32,
    'Outside': 224,
    'Total':  256
}
}
]