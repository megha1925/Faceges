import React, { useEffect, useState } from "react";
import styles from "./login.module.scss";
import Link from "next/link";

import { useRouter } from "next/router";

import { connect } from "react-redux";
import { setAlert } from "../../../redux/actions/alert";
import { loginUser } from "../../../redux/actions/auth";
import { loadUser } from "../../../redux/actions/auth";

const index = (props) => {
  const router = useRouter();
  const [formdata, setFormData] = useState({
    emailOrUname: "",
    password: "",
  });

  const onChange = (e) =>
    setFormData({ ...formdata, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await props.loginUser(formdata.emailOrUname, formdata.password);
  };

  useEffect(() => {
    // if user gets authenticated redirect to dashboard
    if (props.isAuthenticated) {
      router.push(`/account`);
    }
  }, [props.isAuthenticated]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.wel_text}>
          <p>Welcome back</p>
        </div>
        <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
          <div>
            <input
              className={styles.input}
              type="text"
              placeholder="Email or Username"
              name="emailOrUname"
              value={formdata.emailOrUname}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div>
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              name="password"
              minLength={8}
              value={formdata.password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <button className={styles.button} value="login" type="submit">
            <span>Login</span>
          </button>
        </form>
        <p style={{ display: "block" }}>
          Don't have an account? <Link href="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg, alertType) => dispatch(setAlert(msg, alertType)),

    loginUser: (emailOrUname, password) =>
      dispatch(loginUser(emailOrUname, password)),

    loadUser: () => dispatch(loadUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
