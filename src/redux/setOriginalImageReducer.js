import {SET_ORIGINAL_IMAGE} from './actions';

const initialState = {
    src: '',
    title: ''
};

export default function setOriginalImageReducer(state = initialState, action) {
    switch(action.type) {
        case SET_ORIGINAL_IMAGE:
            return {
                ...state,
                src: action.data[0],
                title: action.data[1]
            };
        default:
            return state;
    };
};