import React, { Fragment, useEffect, useState } from "react";
import styles from "./baseProfile.module.scss";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import Spinner from "../../Minor/Spinner";
import Image from "next/image";

const index = (props) => {
  const router = useRouter();
  //profile data
  const [banner, setBanner] = useState("");
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  // useEffect(() => {
  //   // if (props.user) {
  //   //   if (props.profile.profile.followers.includes(props.user._id)) {
  //   //     setToggleFollow(false);
  //   //   }
  //   // }
  // }, [props.user]);

  //to update profile data
  useEffect(() => {
    if (props.userData.userData !== "") {
      const bannerSrc = `${process.env.BASE_URL}${props.userData.userData.banner}`;
      const avatarSrc = `${process.env.BASE_URL}${props.userData.userData.avatar}`;
      setBanner(bannerSrc);
      setAvatar(avatarSrc);
      const companyName = `${props.userData.userData.companyName}`;
      setName(companyName);
    }
  }, [props.userData]);

  return (
    <Fragment>
      {props.userData.loading && props.userData.userData === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className={styles.bannerContain}>
            <img className={styles.banner} src={banner} alt="Banner" />
          </div>
          <div className={styles.container}>
            <div className={styles.head}>
              <img className={styles.avatar} src={avatar} alt="Avatar" />
              <div className={styles.containInfo}>
                <div className={styles.info}>
                  <div>
                    <p>{name}</p>
                  </div>
                </div>
                <div className={styles.buttons}>
                  <p>hi</p>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  userData: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg, alertType) => dispatch(setAlert(msg, alertType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
