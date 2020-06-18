import React from 'react';
import rootReducer from "../../src/redux/rootReducer";
import { createStore } from 'redux';

describe("redux rootReducer specification", () => {
    it('combines all the reducers', () => {
        const store = createStore(rootReducer);

        expect(store.getState().setDetailedResultReducer).toHaveProperty('detailedResult');
        expect(store.getState().setResultsReducer).toHaveProperty('results');
        expect(store.getState().setOriginalImageReducer).toHaveProperty('src');
        expect(store.getState().setOriginalImageReducer).toHaveProperty('title');
    });
});