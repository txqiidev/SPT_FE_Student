import {
  FETCH_MODULES_REQUEST,
  FETCH_MODULES_SUCCESS,
  FETCH_MODULES_FAILURE,
} from "./types";
import http from "../../services/http";
import config from "../../config.json";

export const fetchModulesRequest = () => {
  return {
    type: FETCH_MODULES_REQUEST,
  };
};

export const fetchModulesSuccess = (modules) => {
  return {
    type: FETCH_MODULES_SUCCESS,
    payload: modules,
  };
};

export const fetchModulesFailure = (error) => {
  return {
    type: FETCH_MODULES_FAILURE,
    payload: error,
  };
};

export const fetchModules = (id) => {
  return (dispatch) => {
    dispatch(fetchModulesRequest());
    http
      .get(config.apiEndpoint + `student/modules/${id}`)
      .then((response) => {
        dispatch(fetchModulesSuccess(response.data));
      })
      .catch((error) => {
        const errorMsg = error;
        dispatch(fetchModulesFailure(errorMsg));
      });
  };
};
