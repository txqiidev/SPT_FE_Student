import {
  FETCH_MODULES_REQUEST,
  FETCH_MODULES_SUCCESS,
  FETCH_MODULES_FAILURE,
} from "./types";

const initialState = {
  loading: true,
  modules: [],
  error: "",
};

const modulesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MODULES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MODULES_SUCCESS:
      return {
        loading: false,
        modules: action.payload,
        error: "",
      };
    case FETCH_MODULES_FAILURE:
      return {
        loading: false,
        modules: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default modulesReducer;
