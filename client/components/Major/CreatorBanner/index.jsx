import React from "react";
import styles from "./creatorBanner.module.scss";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faUpload } from "@fortawesome/free-solid-svg-icons";

//layouts
import Modal from "../Modal";

const index = ({
  banner,
  setOpenBanner,
  openBanner,
  setPreviewImage,
  onSubmit,
  handleImagePreview,
  previewImage,
  bannerRef,
}) => {
  return (
    <div className={styles.bannerContain}>
      <img className={styles.banner} src={banner} alt="Banner" />
      <div className={styles.changeBanner} onClick={() => setOpenBanner(true)}>
        <FontAwesomeIcon className={styles.icon} icon={faCamera} />
        <p>Edit</p>
      </div>
      <Modal
        open={openBanner}
        onClose={() => {
          setOpenBanner(false);
          setPreviewImage({
            file: "",
            imagePreviewUrl: "",
          });
        }}
      >
        <form
          className={styles.bannerform}
          id="form"
          onSubmit={(e) => onSubmit(e)}
          encType="multipart/form-data"
        >
          <label htmlFor="banner">
            <div>
              <p>Click or</p>
              <p>Drag and Drop the Image here</p>
              <FontAwesomeIcon className={styles.icon} icon={faUpload} />
            </div>
            <input
              type="file"
              accept="image/*"
              name="banner"
              id="banner"
              onChange={(e) => handleImagePreview(e)}
            />
          </label>

          {previewImage.imagePreviewUrl != "" ? (
            <div className={styles.preview}>
              <img
                ref={bannerRef}
                alt="Banner Preview"
                className={styles.previewBannerImage}
                src={previewImage.imagePreviewUrl}
              />
            </div>
          ) : (
            <div className={styles.preview}>
              <div className={styles.previewNoImage}>
                <p>Upload Banner for preview </p>
                <p> 1280px x 320px (16:4)</p>
              </div>
            </div>
          )}
          <button value="submit" type="submit">
            <span>Change Banner</span>
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default index;
