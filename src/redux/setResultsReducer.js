import {SET_RESULTS} from './actions';

const initialState = {
    results: []
};

export default function setResultsReducer(state = initialState, action) {
    switch(action.type) {
        case SET_RESULTS:
            return {
                ...state,
                results: action.data
            };
        default:
            return state;
    };
};