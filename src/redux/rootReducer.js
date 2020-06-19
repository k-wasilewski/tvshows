import { combineReducers } from 'redux';
import setResultsReducer from './setResultsReducer';
import setDetailedResultReducer from './setDetailedResultReducer';
import setOriginalImageReducer from "./setOriginalImageReducer";
import setQueryReducer from "./setQueryReducer";

export default combineReducers({
    setResultsReducer,
    setDetailedResultReducer,
    setOriginalImageReducer,
    setQueryReducer
});