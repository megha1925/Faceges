import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "../types";
import axios from "axios";

import api from "../../utils/api";

import { setAlert } from "./alert";

//Load User , returns user data if token matches
export const loadUser = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      const res = await axios.get(`${process.env.BASE_URL}/api/auth`);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Login User
export const loginUser = (emailOrUname, password) => async (dispatch) => {
  const body = JSON.stringify({ emailOrUname, password });
  try {
    const res = await api.post("/auth", body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch({
      type: USER_LOADED,
    });
  } catch (err) {
    const errors = err.response.data.errors; // errors array from backend
    //looping through errors and trigerring setAlert
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Register User
export const registerUser =
  ({ uname, companyName, email, password }) =>
  async (dispatch) => {
    const body = JSON.stringify({
      uname,
      companyName,
      email,
      password,
    });

    try {
      const res = await api.post("/users", body);
      dispatch(setAlert(res.data, "success"));
    } catch (err) {
      const errors = err.response.data.errors; // errors array from backend
      //looping through errors and trigerring setAlert
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
    }
  };

//Logout

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  // dispatch({
  //   type: CLEAR_PROFILE,
  // });
};
