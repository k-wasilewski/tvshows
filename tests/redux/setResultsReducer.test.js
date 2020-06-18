import React from 'react';
import * as actions from "../../src/redux/actions"
import setResultsReducer from "../../src/redux/setResultsReducer";

describe("redux setResultsReducer specification", () => {
    it('returns the initial state when no action has been called', () => {
        expect(setResultsReducer(undefined, {})).toEqual({
            results: []
        });
    });

    it('returns state with detailedResult value when setDetailedResult(detailedResult) ' +
        'action has been called', () => {
        const resultsValue = ['sample result1', 'sample result2'];
        expect(setResultsReducer([], actions.setResults(resultsValue)))
            .toEqual({results: resultsValue});
    });
})