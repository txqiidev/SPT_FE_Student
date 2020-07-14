import {
  FETCH_LOCATION_REQUEST,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_FAILURE,
} from "./types";

const initialState = {
  loading: true,
  locations: [],
  error: "",
};

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LOCATION_SUCCESS:
      return {
        loading: false,
        locations: action.payload,
        error: "",
      };
    case FETCH_LOCATION_FAILURE:
      return {
        loading: false,
        locations: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default locationsReducer;
