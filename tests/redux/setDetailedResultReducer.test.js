import React from 'react';
import * as actions from "../../src/redux/actions"
import setDetailedResultReducer from "../../src/redux/setDetailedResultReducer";

describe("redux setDetailedResultReducer specification", () => {
    it('returns the initial state when no action has been called', () => {
        expect(setDetailedResultReducer(undefined, {})).toEqual({
            detailedResult: []
        });
    });

    it('returns state with detailedResult value when setDetailedResult(detailedResult) ' +
        'action has been called', () => {
        const detailedResultValue = 'sample detailed result'
        expect(setDetailedResultReducer([], actions.setDetailedResult(detailedResultValue)))
            .toEqual({detailedResult: detailedResultValue});
    });
})