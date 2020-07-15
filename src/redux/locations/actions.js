import {
  FETCH_LOCATION_REQUEST,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_FAILURE,
} from "./types";
import http from "../../services/http";
import config from "../../config.json";

export const fetchLocationRequest = () => {
  return {
    type: FETCH_LOCATION_REQUEST,
  };
};

export const fetchLocationSuccess = (locations) => {
  return {
    type: FETCH_LOCATION_SUCCESS,
    payload: locations,
  };
};

export const fetchLocationFailure = (error) => {
  return {
    type: FETCH_LOCATION_FAILURE,
    payload: error,
  };
};

export const fetchLocation = () => {
  return (dispatch) => {
    dispatch(fetchLocationRequest());
    http
      .get(config.apiEndpoint + "locations")
      .then((response) => {
        dispatch(fetchLocationSuccess(response.data));
      })
      .catch((error) => {
        const errorMsg = error;
        dispatch(fetchLocationFailure(errorMsg));
      });
  };
};
