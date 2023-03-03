import { combineReducers } from "redux";

//Reducers import
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
