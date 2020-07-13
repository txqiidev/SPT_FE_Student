import {
  FETCH_STUDYPROGRAMMES_REQUEST,
  FETCH_STUDYPROGRAMMES_SUCCESS,
  FETCH_STUDYPROGRAMMES_FAILURE,
} from "./types";
import http from "../../services/http";
import config from "../../config.json";

export const fetchStudyprogrammesRequest = () => {
  return {
    type: FETCH_STUDYPROGRAMMES_REQUEST,
  };
};

export const fetchStudyprogrammesSuccess = (studyprogrammes) => {
  return {
    type: FETCH_STUDYPROGRAMMES_SUCCESS,
    payload: studyprogrammes,
  };
};

export const fetchStudyprogrammesFailure = (error) => {
  return {
    type: FETCH_STUDYPROGRAMMES_FAILURE,
    payload: error,
  };
};

export const fetchStudyprogrammes = () => {
  return (dispatch) => {
    dispatch(fetchStudyprogrammesRequest());
    http
      .get(config.apiEndpoint + "admin/studyprogramme")
      .then((response) => {
        dispatch(fetchStudyprogrammesSuccess(response.data));
      })
      .catch((error) => {
        const errorMsg = error;
        dispatch(fetchStudyprogrammesFailure(errorMsg));
      });
  };
};
