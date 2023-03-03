import React from "react";
import styles from "./Alert.module.scss";

//redux
import { connect } from "react-redux";

const Alert = (props) => {
  return (
    props.alerts != null &&
    props.alerts.map((alert) => (
      <div key={alert.id} className={styles.container}>
        <div className={`${styles[alert.alertType]}`}>
          <p>{alert.msg}</p>
        </div>
      </div>
    ))
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, null)(Alert);
