import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import studyprogrammeReducer from "./studyprogrammes/reducer";

const rootReducer = combineReducers({
  studyprogramme: studyprogrammeReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
