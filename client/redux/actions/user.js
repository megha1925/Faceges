import { GET_USER, USER_ERROR } from "../types";

import axios from "axios";
//import api from "../../utils/api";
import { setAlert } from "./alert";

// get current user
export const getCurrentUser = (query) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.BASE_URL}/api/users/${query}`);
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
    });
  }
};

//update Profile pictures of user
export const updateDp = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    await axios.post(`${process.env.BASE_URL}/api/users/dp`, formData, config);
    dispatch(setAlert("Image uploaded successfully", "success"));
  } catch (err) {
    console.log(err);
    dispatch(setAlert("Image update failed", "danger"));
  }
};
