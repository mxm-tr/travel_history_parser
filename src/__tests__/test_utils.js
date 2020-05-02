
import {
    sortTravelChecks,
    travelTypes,
    computeTravelDurationDays,
    travelChecksToTravelsList,
    sumTravelDaysInside,
} from "../utils.js";

import { validTravelChecksUnordered,
    validTravelChecksOrdered,
    validTotalDaysCountNoTimeWindow, 
    validTravelsNoTimeWindow,
    testTravelsTimeWindows
} from "./test_data.js";

import { moment } from 'moment';

test('Travel ordering function', () => {
    expect(sortTravelChecks(
        validTravelChecksUnordered
    )).toStrictEqual(validTravelChecksOrdered);
  });


test('Time difference function', () => {
    expect(computeTravelDurationDays('2017-01-01', '2017-12-31')).toStrictEqual(365);
    expect(computeTravelDurationDays('2017-01-01', '2017-04-15')).toStrictEqual(105);
    expect(computeTravelDurationDays('2017-04-20', '2017-12-31')).toStrictEqual(256);
});

test('Travel checks to travels function, no time window', () => {
    const result=travelChecksToTravelsList(
        validTravelChecksUnordered
    )
    expect(result["travels"]).toStrictEqual(validTravelsNoTimeWindow);
    expect(result["errors"]).toStrictEqual([]);
  });

test('Travel checks to travels function, with time window', () => {

    testTravelsTimeWindows.forEach(test => {

        let result=travelChecksToTravelsList(
            validTravelChecksUnordered,
            test['dateWindowStart'],
            test['dateWindowStop']
        )

        expect(result["travels"]).toStrictEqual(test['travels']);
        expect(result["errors"]).toStrictEqual([]);
    })
});

test('Sum travels function, with time window', () => {
    testTravelsTimeWindows.forEach(test => {
        let sumTravelsInside = sumTravelDaysInside(test['travels'])

        // Test inside days computation
        expect(sumTravelsInside
        ).toStrictEqual(test['totalDaysCount']['Inside']);

        // Test total days
        expect(computeTravelDurationDays(test["dateWindowStart"], test["dateWindowStop"])
        ).toStrictEqual(test['totalDaysCount']['Total']);

        // Test outside = Total days - Inside days
        expect(test['totalDaysCount']['Total'] - sumTravelsInside
        ).toStrictEqual(test['totalDaysCount']['Outside']);
    });

  });
