import {SET_QUERY} from './actions';

const initialState = {
    query: ''
};

export default function setQueryReducer(state = initialState, action) {
    switch(action.type) {
        case SET_QUERY:
            return {
                ...state,
                query: action.data
            };
        default:
            return state;
    };
};