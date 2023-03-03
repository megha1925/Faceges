import React, { useState } from "react";
import styles from "./signup.module.scss";
import Link from "next/link";

import { useRouter } from "next/router";

//redux
import { connect } from "react-redux";
import { setAlert } from "../../../redux/actions/alert";
import { registerUser } from "../../../redux/actions/auth";
import { loadUser } from "../../../redux/actions/auth";

const index = (props) => {
  const router = useRouter();
  const [formdata, setFormData] = useState({
    uname: "",
    companyName: "",
    email: "",
    password: "",
    password2: "",
  });

  //updating state on change in form
  const onChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };
  const onChangeUname = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value.toLowerCase() });
  };

  //Submit function to submit the form data
  const onSubmit = async (e) => {
    e.preventDefault();
    if (formdata.password !== formdata.password2) {
      props.setAlert("Passwords do not match ", "danger");
    } else {
      //submit form data to server
      const user = {
        uname: formdata.uname,
        companyName: formdata.companyName,
        email: formdata.email,
        password: formdata.password,
      };
      props.registerUser(user);
    }
  };

  // if user gets authenticated redirect to dashboard
  if (props.isAuthenticated) {
    router.push("/account");
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.txtwrap}>
          <p>Create Your Account</p>
        </div>
        <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
          <div className={styles.username}>
            <p>faceges.com/</p>
            <input
              className={styles.input_box}
              type="text"
              placeholder="Username"
              name="uname"
              pattern="^[a-z_]+([._]?[a-z0-9]+)*$"
              title="username is case-insensative "
              value={formdata.uname}
              onChange={(e) => {
                onChangeUname(e);
              }}
              required
            />
          </div>
          <div>
            <input
              className={styles.input_box}
              type="text"
              placeholder="Company Name"
              pattern="^[A-Z][a-z]{0,26}$"
              title="First letter should be in Uppercase, numbers and special characters are not allowed"
              name="companyName"
              value={formdata.companyName}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div>
            <input
              className={styles.input_box}
              type="email"
              placeholder="Email Address"
              name="email"
              value={formdata.email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className={styles.name}>
            <input
              className={styles.input_box}
              type="password"
              placeholder="Password"
              name="password"
              title="Password must be of atleast 8 characters"
              minLength={8}
              value={formdata.password}
              onChange={(e) => onChange(e)}
            />

            <input
              className={styles.input_box}
              type="password"
              placeholder="Confirm Password"
              name="password2"
              title="Password must be of atleast 8 characters"
              minLength={8}
              value={formdata.password2}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div>
            <button className={styles.butn} type="submit">
              <span>Register</span>
            </button>
          </div>
        </form>
        <p>
          Already have an account? <Link href="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg, alertType) => dispatch(setAlert(msg, alertType)),

    registerUser: ({ uname, companyName, email, password }) =>
      dispatch(registerUser({ uname, companyName, email, password })),
    loadUser: () => dispatch(loadUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
