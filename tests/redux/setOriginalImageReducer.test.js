import React from 'react';
import * as actions from "../../src/redux/actions"
import setOriginalImageReducer from "../../src/redux/setOriginalImageReducer";

describe("redux setOriginalImageReducer specification", () => {
    it('returns the initial state when no action has been called', () => {
        expect(setOriginalImageReducer(undefined, {})).toEqual({
            src: '',
            title: ''
        });
    });

    it('returns state with src and title values when setOriginalImage(src, title) ' +
        'action has been called', () => {
        const testSrc = 'http://sample.url';
        const testTitle = 'sample title';
        expect(setOriginalImageReducer([], actions.setOriginalImage(testSrc, testTitle)))
            .toEqual({src: testSrc, title: testTitle});
    });
})