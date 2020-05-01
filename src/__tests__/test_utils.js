
import {
    sortTravelChecks,
    travelTypes,
    travelChecksToTravelsList,
    sumTravelDaysInside,
    sumTravelDaysOutside,
    sumTravelDays
} from "../utils.js";

import { validTravelChecksUnordered,
    validTravelChecksOrdered,
    validTotalDaysCountNoTimeWindow, 
    validTravelsNoTimeWindow,
    testTravelsTimeWindows
} from "./test_data.js";

test('Travel ordering function', () => {
    expect(sortTravelChecks(
        validTravelChecksUnordered
    )).toStrictEqual(validTravelChecksOrdered);
  });


  test('Travel checks to travels function, no time window', () => {
    const result=travelChecksToTravelsList(
        validTravelChecksUnordered
    )
    expect(result["travels"]).toStrictEqual(validTravelsNoTimeWindow);
    expect(result["errors"]).toStrictEqual([]);
  });

test('Sum travels function, no time window', () => {
    expect(sumTravelDaysInside(
        validTravelsNoTimeWindow)
    ).toStrictEqual(validTotalDaysCountNoTimeWindow['Inside']);
    expect(sumTravelDaysOutside(
        validTravelsNoTimeWindow)
    ).toStrictEqual(validTotalDaysCountNoTimeWindow['Outside']);
    expect(sumTravelDays(
        validTravelsNoTimeWindow)
    ).toStrictEqual(validTotalDaysCountNoTimeWindow['Total']);
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
        expect(sumTravelDaysInside(
            test['travels'])
        ).toStrictEqual(test['totalDaysCount']['Inside']);
        expect(sumTravelDaysOutside(
            test['travels'])
        ).toStrictEqual(test['totalDaysCount']['Outside']);
        expect(sumTravelDays(
            test['travels'])
        ).toStrictEqual(test['totalDaysCount']['Total']);
    });

  });

