import React from 'react';
import * as actions from "../../src/redux/actions"
import setQueryReducer from "../../src/redux/setQueryReducer";

describe("redux setQueryReducer specification", () => {
    it('returns the initial state when no action has been called', () => {
        expect(setQueryReducer(undefined, {})).toEqual({
            query: ''
        });
    });

    it('returns state with query value when setQuery(query) ' +
        'action has been called', () => {
        const query = 'sample query';
        expect(setQueryReducer([], actions.setQuery(query)))
            .toEqual({query: query});
    });
})