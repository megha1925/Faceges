import { GET_USER, USER_ERROR, CLEAR_USER } from "../types";

const initialState = {
  userData: null,
  loading: true,
  error: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        userData: action.payload,
        loading: false,
        error: {},
      };
    case USER_ERROR:
      return {
        ...state,
        error: {},
        loading: false,
        userData: null,
      };
    case CLEAR_USER:
      return {
        ...state,
        userData: null,
        error: {},
      };
    default:
      return state;
  }
};

export default userReducer;
