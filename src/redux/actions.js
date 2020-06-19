export const SET_RESULTS = 'SET_RESULTS';
export const SET_DETAILED_RESULT = 'SET_DETAILED_RESULT';
export const SET_ORIGINAL_IMAGE = 'SET_ORIGINAL_IMAGE';
export const SET_QUERY = 'SET_QUERY';

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

export function setOriginalImage(src, title) {
    return {
        type: SET_ORIGINAL_IMAGE,
        data: [src, title]
    };
};

export function setQuery(query) {
    return {
        type: SET_QUERY,
        data: query
    };
};