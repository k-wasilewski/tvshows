import {SET_SOMETHING} from "./actions";

const initialState = {
    item: []
};

export default function setSomethingReducer(state = initialState, action) {
    switch(action.type) {
        case SET_SOMETHING:
            return {
                ...state,
                item: action.data
            };
        default:
            return state;
    };
};