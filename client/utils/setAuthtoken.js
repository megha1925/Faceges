import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["auth-token"] = token; // setting global header using axios
  } else {
    delete axios.defaults.headers.common["auth-token"];
  }
};

export default setAuthToken;
