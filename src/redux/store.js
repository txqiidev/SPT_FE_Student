import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import studyprogrammeReducer from "./studyprogrammes/reducer";
import modulesReducer from "./modules/reducer";
import moduleGroupsReducer from "./moduleGroups/reducer";
import locationsReducer from "./locations/reducer";
import userReducer from "./user/reducer";

const rootReducer = combineReducers({
  studyprogramme: studyprogrammeReducer,
  modules: modulesReducer,
  moduleGroups: moduleGroupsReducer,
  locations: locationsReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
