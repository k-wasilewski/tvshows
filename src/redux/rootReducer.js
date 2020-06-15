import { combineReducers } from "redux";
import setResultsReducer from "./setResultsReducer";
import setDetailedResultReducer from "./setDetailedResultReducer";

export default combineReducers({
    setResultsReducer,
    setDetailedResultReducer
});