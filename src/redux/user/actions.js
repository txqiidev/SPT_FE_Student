import {
  SAVE_USER,
  FETCH_PLAN_SUCCESS,
  FETCH_PLAN_REQUEST,
  FETCH_PLAN_FAILURE,
} from "./types";
import http from "../../services/http";
import config from "../../config.json";

export const saveUser = (user) => {
  console.log("action", user);
  return {
    type: SAVE_USER,
    payload: user,
  };
};

export const fetchPlanRequest = () => {
  return {
    type: FETCH_PLAN_REQUEST,
  };
};

export const fetchPlanSuccess = (plan) => {
  return {
    type: FETCH_PLAN_SUCCESS,
    payload: plan,
  };
};

export const fetchPlanFailure = (error) => {
  return {
    type: FETCH_PLAN_FAILURE,
    payload: error,
  };
};

export const fetchPlan = (id) => {
  return (dispatch) => {
    dispatch(fetchPlanRequest());
    http
      .get(config.apiEndpoint + `student/plan/${id}`)
      .then((response) => {
        dispatch(fetchPlanSuccess(response.data));
      })
      .catch((error) => {
        const errorMsg = error;
        dispatch(fetchPlanFailure(errorMsg));
      });
  };
};

export const savePlan = (email, idSemester, idModule) => {
  return (dispatch) => {
    dispatch(fetchPlanRequest());
    http
      .post(config.apiEndpoint + "student/addToPlan", {
        email: email,
        idSemester: idSemester,
        idModule: idModule,
      })
      .then(() => {
        dispatch(fetchPlan(email));
      })
      .catch((error) => {
        const errorMsg = error;
        dispatch(fetchPlanFailure(errorMsg));
      });
  };
};

export const addSemester = (email, idSemester) => {
  return (dispatch) => {
    dispatch(fetchPlanRequest());
    http
      .post(config.apiEndpoint + "student/addSemester", {
        email: email,
        idSemester: idSemester,
      })
      .then(() => {
        dispatch(fetchPlan(email));
      })
      .catch((error) => {
        dispatch(fetchPlanFailure(error.response.data));
      });
  };
};

export const deleteSemester = (email, idSemester) => {
  return (dispatch) => {
    dispatch(fetchPlanRequest());
    http
      .delete(config.apiEndpoint + "student/deleteSemester", {
        data: {
          email: email,
          idSemester: idSemester,
        },
      })
      .then(() => {
        dispatch(fetchPlan(email));
      })
      .catch((error) => {
        const errorMsg = error;
        dispatch(fetchPlanFailure(error.response.data));
      });
  };
};
