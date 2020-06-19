import { combineReducers } from 'redux';
import setResultsReducer from './setResultsReducer';
import setDetailedResultReducer from './setDetailedResultReducer';
import setOriginalImageReducer from "./setOriginalImageReducer";

export default combineReducers({
    setResultsReducer,
    setDetailedResultReducer,
    setOriginalImageReducer
});