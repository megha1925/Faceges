import React, { useEffect, useState } from "react";
import styles from "./pay.module.scss";

import axios from "axios";

import { useRouter } from "next/router";
//redux
import { connect } from "react-redux";
import { setAlert } from "../../../redux/actions/alert";

import { loadStripe } from "@stripe/stripe-js";

import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "FaceMask Detection",
    price: 8000,
  });

  const body = JSON.stringify({ product: product });
  const cBody = JSON.stringify({ user_id: props.user });

  const makePayment = async (event) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }
    const paymentMethod = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (paymentMethod.error) {
      props.setAlert(error.message, "danger");
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.BASE_URL}/api/payment`,
        body,
        { headers: { "Content-Type": "application/json" } }
      );
      const paymentIntent = await stripe.confirmCardPayment(
        res.data.client_secret,
        {
          payment_method: paymentMethod.paymentMethod.id,
        }
      );
      if ((paymentIntent.status = "succeeded")) {
        const confirmRes = await axios.post(
          `${process.env.BASE_URL}/api/payment/confirm`,
          cBody,
          { headers: { "Content-Type": "application/json" } }
        );
        props.setAlert(confirmRes.data.msg, "success");
      }
      props.setAlert("Payment done Successfully", "success");
      router.push("/account");
    } catch (err) {
      props.setAlert(err.message, "danger");
    }
  };

  const iframeStyles = {
    base: {
      color: "black",
      fontSize: "16px",
      "::placeholder": {
        color: "blue",
      },
    },
    invalid: {
      iconColor: "#FF2000",
      color: "#FF2000",
    },
    complete: {
      iconColor: "#4BB543",
    },
  };

  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true,
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.body}>
          <p>Buy Faceges one time subscription</p>
          <p>Rs. 8000</p>
        </div>
      </div>
      <form className={styles.form} onSubmit={makePayment}>
        <CardElement options={cardElementOpts} />
        <button type="submit" disabled={!stripe || !elements}>
          Pay
        </button>
      </form>
    </div>
  );
};

const stripePromise = loadStripe(process.env.STRIPE_PKEY);
const index = (props) => {
  const router = useRouter();

  useEffect(() => {
    if (props.user != null) {
      if (props.user.isPremium) {
        router.push("/account");
      }
    } else {
      router.push("/account");
    }
  }, [props.user]);

  return (
    <div className={styles.container}>
      <Elements stripe={stripePromise}>
        {props.user ? (
          <CheckoutForm user={props.user._id} setAlert={props.setAlert} />
        ) : (
          <div></div>
        )}
      </Elements>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
