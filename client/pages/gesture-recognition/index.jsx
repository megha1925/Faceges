import { useRef, useState } from "react";
import Head from "next/head";

import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import styles from "./styles.module.scss";
import { drawHand } from "../../utils/utilities";

import * as fp from "fingerpose";
import Layout from "../../components/Layout";

import dynamic from "next/dynamic";

const UserLoadedNoSSR = dynamic(() => import("../../utils/loadUser"), {
  ssr: false,
});

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [emoji, setEmoji] = useState(null);
  const images = {
    thumbs_up: "/emoji/thumbs_up.png",
    victory: "/emoji/victory.png",
  };

  const runHandpose = async () => {
    console.log("Loading model");
    const handposeModel = await handpose.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(handposeModel);
    }, 10);
  };

  const detect = async (handposeModel) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await handposeModel.estimateHands(video);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const confidence = gesture.gestures.map(
            (prediction) => prediction.score
          );
          const maxConfidence = confidence.indexOf(Math.max(...confidence));
          setEmoji(gesture.gestures[maxConfidence].name);
        }
      }

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  const startHandler = () => {
    runHandpose();
  };

  const stopHandler = () => {
    window.location.reload();
  };

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <meta name="description" content="Live Webcam Gesture Recognition" />
          <title>Gesture Recognition</title>
        </Head>
        <UserLoadedNoSSR />
        <div className={styles.header}>
          <p>LIVE GESTURE RECOGNITION</p>
          <Webcam
            ref={webcamRef}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              zindex: 9,
              width: 640,
              height: 480,
            }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: 640,
              height: 480,
            }}
          />
          {emoji !== null ? (
            <img
              src={images[emoji]}
              style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 400,
                bottom: 500,
                right: 0,
                textAlign: "center",
                height: 100,
              }}
            />
          ) : (
            ""
          )}
        </div>

        <div className={styles.btnContainer}>
          <div className={styles.btn}>
            <button onClick={startHandler}>Start</button>
          </div>
          <div className={styles.btn}>
            <button onClick={stopHandler}>Stop</button>
          </div>
          <div className={styles.btn}>
            <a href="/">GO HOME</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
