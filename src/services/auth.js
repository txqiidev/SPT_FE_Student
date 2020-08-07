import http from "./http";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

const register = async (
  firstname,
  lastname,
  email,
  password,
  year,
  studyprogramme
) => {
  const { data } = await http.post(config.apiEndpoint + "user/registration", {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
    year: year,
    studyprogramme: studyprogramme,
    isAdmin: 0,
  });
  // stores token in the local storage of the browser
  localStorage.setItem(tokenKey, data);
};

const login = async (email, password) => {
  const { data } = await http.post(config.apiEndpoint + "user/authentication", {
    email,
    password,
  });
  // stores token in the local storage of the browser
  localStorage.setItem(tokenKey, data);
};

// removes token from the local storage of the browser
const logout = () => {
  localStorage.removeItem(tokenKey);
  window.location = "/";
};

const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
};

http.setJwt(getJwt());

export default { login, logout, getJwt, getCurrentUser, register };
