import {SET_DETAILED_RESULT} from './actions';

const initialState = {
    detailedResult: []
};

export default function setResultsReducer(state = initialState, action) {
    switch(action.type) {
        case SET_DETAILED_RESULT:
            return {
                ...state,
                detailedResult: action.data
            };
        default:
            return state;
    };
};