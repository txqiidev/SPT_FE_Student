import {
  SAVE_USER,
  FETCH_PLAN_FAILURE,
  FETCH_PLAN_SUCCESS,
  FETCH_PLAN_REQUEST,
  SET_MODULES_PLANED,
} from "./types";

const initialState = {
  loading: true,
  error: "",
  email: "",
  firstname: "",
  lastname: "",
  plan: [],
  modulesPlaned: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        email: action.payload.email,
        firstname: action.payload.Firstname,
        lastname: action.payload.Lastname,
      };
    case FETCH_PLAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        plan: action.payload,
        error: "",
      };
    case FETCH_PLAN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_MODULES_PLANED:
      return {
        ...state,
        modulesPlaned: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
