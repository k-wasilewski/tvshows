export const SET_SOMETHING = 'SET_SOMETHING';

export function setSomething(sth) {
    return {
        type: SET_SOMETHING,
        data: sth
    };
};