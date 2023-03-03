import React, { Fragment, useEffect } from "react";
import styles from "./profile.module.scss";

//redux
import { connect } from "react-redux";
import { getCurrentUser } from "../../../redux/actions/user";

//components
import FourOFour from "../../Minor/404";
import Spinner from "../../Minor/Spinner";
import BaseProfile from "../BaseProfile";
import CurrentUserProfile from "../CurrentUserProfile";

const index = (props) => {
  useEffect(() => {
    props.getCurrentUser(props.query);
  }, [props.query]);

  return (
    <div className={styles.container}>
      {props.userData.loading && props.userData.userData === null ? (
        <Spinner />
      ) : (
        <Fragment>
          {/* If no user was found */}
          {props.userData.userData === "No User Found" ? (
            <FourOFour />
          ) : (
            <Fragment>
              {/* If user is not loged in then render Base profile  */}
              {props.user === null ? (
                <BaseProfile />
              ) : (
                <div>
                  {/* If user is logged in then render Base Profile for everyone other than the loged in user */}
                  {props.user.username === props.query ? (
                    <CurrentUserProfile />
                  ) : (
                    <BaseProfile />
                  )}
                </div>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  // isAuthenticated: state.auth.isAuthenticated,
  // loading: state.auth.loading,
  user: state.auth.user,
  userData: state.user,
  // profile: state.profile,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // setAlert: (msg: string, alertType: string) =>
    //   dispatch(setAlert(msg, alertType)),
    // loginUser: (emailOrUname, password) =>
    //   dispatch(loginUser(emailOrUname, password)),
    //loadUser: () => dispatch(loadUser()),
    getCurrentUser: (query) => dispatch(getCurrentUser(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
