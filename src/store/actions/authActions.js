import * as actionTypes from "../actions/actionTypes";
import axios from "axios";

export const logout = () => {
  // localStorage.removeItem("token");
  // localStorage.removeItem("expDate");
  // localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_INIT_LOGOUT,
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.LOG_OUT,
  };
};

export const checkAuthTimeout = (expiresIn) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expiresIn,
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSignUp: isSignUp,
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(logout());
    } else {
      const expDate = new Date(localStorage.getItem("expDate"));
      if (expDate < new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout((expDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};
