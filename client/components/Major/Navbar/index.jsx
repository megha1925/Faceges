import React, { useEffect, useState } from "react";
import styles from "./navbar.module.scss";
import Link from "next/link";

//redux
import { connect } from "react-redux";
import { logout } from "../../../redux/actions/auth";
import { useRouter } from "next/router";

const index = (props) => {
  const router = useRouter();
  const [avatar, setAvatar] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const profileMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const logoutHandler = async () => {
    await props.logout();
    router.push("/login");
  };

  const profileHandler = () => {
    router.push("/account");
  };

  const authLinks = (
    <div className={styles.menu}>
      <div onClick={profileMenuToggle}>
        <img className={styles.profile} src={avatar} alt="Profile" />
      </div>
      {showMenu ? (
        <div className={styles.dropdown}>
          <div onClick={profileHandler}>
            <p>Profile</p>
          </div>
          <div onClick={logoutHandler}>
            <p>Logout</p>
          </div>
        </div>
      ) : null}
    </div>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link href="/register">Register</Link>
      </li>
      <li>
        <Link href="/login">Login</Link>
      </li>
    </ul>
  );

  useEffect(() => {
    if (props.user) {
      const srcString = `${process.env.BASE_URL}${props.user.avatar}`;
      setAvatar(srcString);
    }
  }, [props.user]);

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/logo.png" alt="Faceges" />
        </Link>
      </div>
      <div className={styles.links}>
        {props.isAuthenticated ? authLinks : guestLinks}
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
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
