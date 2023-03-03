import { useState, useRef } from "react";
import Head from "next/head";
import styles from "./styles.module.scss";

import Webcam from "react-webcam";

import maskImages from "../../../utils/maskImages";
import noMaskImages from "../../../utils/noMaskImages";

import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";

const FaceMask = (props) => {
  const [result, setResult] = useState("");
  const [prob, setProb] = useState("");
  const [loadingText, setLoadingText] = useState("");

  const webcamRef = useRef(null);

  const createWebcamInput = async () => {
    const videoElement = await webcamRef.current.video;
    const tfCam = await tf.data.webcam(videoElement);
    return tfCam;
  };

  const addImagesToDom = async () => {
    const train = document.querySelector("#trainImage");
    maskImages.map(({ src, alt }) => {
      const newImage = document.createElement("IMG");
      newImage.setAttribute("src", src);
      newImage.setAttribute("alt", alt);
      newImage.classList.add("mask-img");
      return train.appendChild(newImage);
    });
    noMaskImages.map(({ src, alt }) => {
      const newImage = document.createElement("IMG");
      newImage.setAttribute("src", src);
      newImage.setAttribute("alt", alt);
      newImage.classList.add("no-mask-img");
      return train.appendChild(newImage);
    });

    // for (let i = 0; i < 30; i++) {
    //   let src = noMaskImages[i].src;
    //   let alt = noMaskImages[i].alt;
    //   const newImage = document.createElement("IMG");
    //   newImage.setAttribute("src", src);
    //   newImage.setAttribute("alt", alt);
    //   newImage.classList.add("no-mask-img");
    //   train.appendChild(newImage);
    // }
  };

  const moduleLoading = () => {
    return {
      __html: loadingText,
    };
  };
  const start = async () => {
    await addImagesToDom();
    console.log("IMAGES ADDED IN DOM FOR TRAINING");
    setLoadingText("IMAGES ADDED IN DOM FOR TRAINING");
    console.log("LOADING MOBILENET MODEL");
    setLoadingText("LOADING REQUIRED MODELS");
    const model = await mobilenet.load();
    console.log("MOBILENET MODEL LOADED");
    setLoadingText("MOBILENET MODEL LOADED");
    await tf.ready();
    console.log("TENSOR FLOW READY");
    setLoadingText("TENSORFLOW READY");
    const knn = knnClassifier.create();
    console.log("KNN Classifier CREATED");
    setLoadingText("KNN Classifier CREATED");
    setLoadingText("Starting...");
    const webCamInput = await createWebcamInput();
    setLoadingText("");

    const trainClassifier = async () => {
      // Train using mask images
      const mask = document.querySelectorAll(".mask-img"); //const maskImages = trainMaskImg.current.childNodes;
      mask.forEach((img) => {
        try {
          const tfImg = tf.browser.fromPixels(img); // tensorflow
          const logits = model.infer(tfImg, "conv_preds"); //mobilenet
          knn.addExample(logits, 0); // has mask
        } catch (error) {
          console.log(error);
        }
      });

      // Train using no mask images
      const noMask = document.querySelectorAll(".no-mask-img"); //const noMaskImages = trainNoMaskImg.current.childNodes;
      noMask.forEach((img) => {
        try {
          const tfImg = tf.browser.fromPixels(img);
          const logits = model.infer(tfImg, "conv_preds");
          knn.addExample(logits, 1); // no mask
        } catch (error) {
          console.log(error);
        }
      });
    };

    const webcamLiveDetection = async () => {
      while (true) {
        try {
          if (knn.getNumClasses() > 0) {
            const img = await webCamInput.capture();
            const activation = model.infer(img, "conv_preds");
            const result = await knn.predictClass(activation);
            img.dispose();
            setResult(result.label);
            setProb(result.confidences[result.label]);
            // Dispose the tensor to release the memory.
          }
          await tf.nextFrame();
        } catch (error) {
          console.log(error.message);
        }
      }
    };

    await trainClassifier();
    await webcamLiveDetection();
    knn.dispose();
  };

  const startHandler = () => {
    start();
  };

  const stopHandler = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <Head>
        <meta name="description" content="Live Webcam face mask detection" />
        <title>Face Mask Detection</title>
      </Head>
      <div>
        <div className={styles.trainImage} id="trainImage"></div>
        <div className={styles.head}>
          <p>LIVE MASK DETECTION</p>
          <Webcam
            className={styles.webcam}
            id="webcam"
            ref={webcamRef}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              width: 640,
              height: 480,
            }}
          />
          <div className={styles.output}>
            {result === "0" ? <p>MASK DETECTED</p> : <p>NO MASK DETECTED</p>}
            <p className={styles.console}>{prob}</p>
            <p dangerouslySetInnerHTML={moduleLoading()}></p>
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
      </div>
    </div>
  );
};

export default FaceMask;
