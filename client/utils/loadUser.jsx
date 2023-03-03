import React, { useEffect } from "react";

import { loadUser } from "../redux/actions/auth";
import setAuthToken from "./setAuthtoken";
import { connect } from "react-redux";

//this component is for setting the global auth-token header with token value in local storage
//loadUser action will get the user from the database if the token verifies at the server
const UserLoad = (props) => {
  useEffect(() => {
    const load = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      await props.loadUser();
    };
    load();
  });
  return <div></div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: () => dispatch(loadUser()),
  };
};
export default connect(null, mapDispatchToProps)(UserLoad);
