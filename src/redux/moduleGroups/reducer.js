import {
  FETCH_MODULEGROUPS_REQUEST,
  FETCH_MODULEGROUPS_SUCCESS,
  FETCH_MODULEGROUPS_FAILURE,
} from "./types";

const initialState = {
  loading: true,
  moduleGroups: [],
  error: "",
};

const moduleGroupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MODULEGROUPS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MODULEGROUPS_SUCCESS:
      return {
        loading: false,
        moduleGroups: action.payload,
        error: "",
      };
    case FETCH_MODULEGROUPS_FAILURE:
      return {
        loading: false,
        moduleGroups: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default moduleGroupsReducer;
