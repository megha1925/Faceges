const path = require("path");
const multer = require("multer");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "avatar") {
      cb(null, "./public/images/avatars");
    }
    if (file.fieldname === "banner") {
      cb(null, "./public/images/banners");
    }
  },

  filename: (req, file, cb) => {
    cb(null, req.user.id + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  let isValid = false;
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg"
  ) {
    isValid = true;
  } else {
    isValid = false;
  }

  let error = isValid ? null : new Error("Invalid mime type!");
  cb(error, isValid);
};

const limits = { files: 2, fileSize: 6 * 1024 * 1024 };

const fileUpload = multer({
  storage: Storage,
  limits: limits,
  fileFilter: fileFilter,
}).fields([
  { name: "avatar", maxCount: 1 },
  { name: "banner", maxCount: 1 },
]);

module.exports = fileUpload;
