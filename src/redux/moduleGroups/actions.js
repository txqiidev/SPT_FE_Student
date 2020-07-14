import {
  FETCH_MODULEGROUPS_REQUEST,
  FETCH_MODULEGROUPS_SUCCESS,
  FETCH_MODULEGROUPS_FAILURE,
} from "./types";
import http from "../../services/http";
import config from "../../config.json";

export const fetchModuleGroupsRequest = () => {
  return {
    type: FETCH_MODULEGROUPS_REQUEST,
  };
};

export const fetchModuleGroupsSuccess = (moduleGroups) => {
  return {
    type: FETCH_MODULEGROUPS_SUCCESS,
    payload: moduleGroups,
  };
};

export const fetchModuleGroupsFailure = (error) => {
  return {
    type: FETCH_MODULEGROUPS_FAILURE,
    payload: error,
  };
};

export const fetchModuleGroups = (id) => {
  return (dispatch) => {
    dispatch(fetchModuleGroupsRequest());
    http
      .get(config.apiEndpoint + `student/modulegroups/${id}`)
      .then((response) => {
        dispatch(fetchModuleGroupsSuccess(response.data));
      })
      .catch((error) => {
        const errorMsg = error;
        dispatch(fetchModuleGroupsFailure(errorMsg));
      });
  };
};
