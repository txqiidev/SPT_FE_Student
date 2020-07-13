import {
  FETCH_STUDYPROGRAMMES_REQUEST,
  FETCH_STUDYPROGRAMMES_SUCCESS,
  FETCH_STUDYPROGRAMMES_FAILURE,
} from "./types";

const initialState = {
  loading: true,
  studyprogramme: [],
  error: "",
};

const studyprogrammeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDYPROGRAMMES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_STUDYPROGRAMMES_SUCCESS:
      return {
        loading: false,
        studyprogramme: action.payload,
        error: "",
      };
    case FETCH_STUDYPROGRAMMES_FAILURE:
      return {
        loading: false,
        studyprogramme: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default studyprogrammeReducer;
