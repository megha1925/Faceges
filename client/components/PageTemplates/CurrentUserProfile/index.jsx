import React, { Fragment, useEffect, useRef, useState } from "react";
import styles from "./currentProfile.module.scss";

import { useRouter } from "next/router";

//cropperjs
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";

//redux
import { connect } from "react-redux";

//icons
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCamera, faUpload } from "@fortawesome/free-solid-svg-icons";

//layouts
// import Modal from "../../layouts/Modal";
import Spinner from "../../Minor/Spinner";
import { updateDp } from "../../../redux/actions/user";

//sub components
import CreatorBody from "../../Major/CreatorBody";
import CreatorHead from "../../Major/CreatorHead";
import CreatorBanner from "../../Major/CreatorBanner";

const index = (props) => {
  const router = useRouter();

  // profile data
  const [banner, setBanner] = useState("");
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  //state to toggle modal to update image
  const [openBanner, setOpenBanner] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);

  //to store cropped image blob
  const [bannerPost, setBannerPost] = useState();
  const [avatarPost, setAvatarPost] = useState();

  //to store blob and url of uploaded image for preview
  const [previewImage, setPreviewImage] = useState({
    file: "",
    imagePreviewUrl: "",
  });

  //preview image div ref
  const bannerRef = useRef();
  const avatarRef = useRef();

  // handle updating of dp and banner
  const onSubmit = async (e) => {
    e.preventDefault();
    //creating formdata to store multipart/form-data
    const formData = new FormData();
    if (bannerPost) {
      formData.append("banner", bannerPost, "banner.png");
    }
    if (avatarPost) {
      formData.append("avatar", avatarPost, "avatar.png");
    }
    await props.updateDp(formData);
    router.reload();
  };

  const handleImagePreview = (e) => {
    e.preventDefault();
    // make blob and image url for preview image
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setPreviewImage({
        file: file,
        imagePreviewUrl: reader.result.toString(),
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  //to update profile data
  useEffect(() => {
    if (props.userData.userData != "") {
      const bannerSrc = `${process.env.BASE_URL}${props.userData.userData.banner}`;
      const avatarSrc = `${process.env.BASE_URL}${props.userData.userData.avatar}`;
      setBanner(bannerSrc);
      setAvatar(avatarSrc);
      const companyName = `${props.userData.userData.companyName}`;
      setName(companyName);
    }
  }, [props.userData]);

  //for cropping image
  useEffect(() => {
    if (bannerRef.current != undefined) {
      const cropper = new Cropper(bannerRef.current, {
        zoomable: false,
        scalable: true,
        highlight: true,
        data: {
          //define cropbox size
          width: 1280,
          height: 320,
        },
        responsive: true,
        aspectRatio: 16 / 4,
        crop: () => {
          const canvas = cropper.getCroppedCanvas();
          canvas.toBlob(async (blob) => {
            setBannerPost(blob);
          });
          //setBannerPost({ imageUrl: canvas.toDataURL("image/png") });
        },
      });
    }
    if (avatarRef.current != undefined) {
      const cropper = new Cropper(avatarRef.current, {
        zoomable: false,
        scalable: true,
        highlight: true,
        data: {
          //define cropbox size
          width: 200,
          height: 200,
        },
        responsive: true,
        aspectRatio: 1,
        crop: () => {
          const canvas = cropper.getCroppedCanvas();
          canvas.toBlob(async (blob) => {
            setAvatarPost(blob);
          });
          //setAvatarPost({ imageUrl: canvas.toDataURL("image/png") });
        },
      });
    }
  });

  return (
    <div className={styles.container}>
      {props.userData.loading && props.userData.userData === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <CreatorBanner
            banner={banner}
            setOpenBanner={setOpenBanner}
            openBanner={openBanner}
            setPreviewImage={setPreviewImage}
            onSubmit={onSubmit}
            handleImagePreview={handleImagePreview}
            previewImage={previewImage}
            bannerRef={bannerRef}
          />
          <CreatorHead
            avatar={avatar}
            setOpenAvatar={setOpenAvatar}
            openAvatar={openAvatar}
            setPreviewImage={setPreviewImage}
            onSubmit={onSubmit}
            handleImagePreview={handleImagePreview}
            previewImage={previewImage}
            avatarRef={avatarRef}
            name={name}
            isPremium={props.userData.userData.isPremium}
          />
          <CreatorBody />
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    // setAlert: (msg: string, alertType: string) =>
    //   dispatch(setAlert(msg, alertType)),
    updateDp: (images) => dispatch(updateDp(images)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
