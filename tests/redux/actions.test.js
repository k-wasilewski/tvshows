import React from 'react';
import * as actions from "../../src/redux/actions"

describe("redux actions specification", () => {
    it('setResults action works as expected', () => {
        const results = ['sample result1',  'sample result2'];
        const expectedAction = {
            type: actions.SET_RESULTS,
            data: results
        };
        expect(actions.setResults(results)).toEqual(expectedAction);
    });

    it('setDetailedResult action works as expected', () => {
        const result = ['sample result'];
        const expectedAction = {
            type: actions.SET_DETAILED_RESULT,
            data: result
        };
        expect(actions.setDetailedResult(result)).toEqual(expectedAction);
    });

    it('setOriginalImage action works as expected', () => {
        const src = 'http://sample.url';
        const title = 'sample title';
        const expectedAction = {
            type: actions.SET_ORIGINAL_IMAGE,
            data: [src, title]
        };
        expect(actions.setOriginalImage(src, title)).toEqual(expectedAction);
    });

    it('setQuery action works as expected', () => {
        const query = 'sample query';
        const expectedAction = {
            type: actions.SET_QUERY,
            data: query
        };
        expect(actions.setQuery(query)).toEqual(expectedAction);
    });
});