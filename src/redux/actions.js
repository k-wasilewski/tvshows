export const SET_RESULTS = 'SET_RESULTS';
export const SET_DETAILED_RESULT = 'SET_DETAILED_RESULT';

export function setResults(results) {
    return {
        type: SET_RESULTS,
        data: results
    };
};

export function setDetailedResult(result) {
    return {
        type: SET_DETAILED_RESULT,
        data: result
    };
};