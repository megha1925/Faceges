const express = require("express");
const router = express.Router();

const app = express();

//helmet for security
const helmet = require("helmet");
app.use(helmet());

const userController = require("../../controllers/userController");
const validation = require("../../middlewares/validation");
const auth = require("../../middlewares/auth");
const dpUpload = require("../../middlewares/dpUpload");

const { checkRegister } = require("../../utils/validationChecks");

// @route POST /api/users
router.post("/", checkRegister(), validation, userController.postSignup);

// @route GET /api/users
router.get("/", userController.getSignup);

// @route Get User data
router.get("/:username", userController.getUser);

// @route POST user profile pictures
router.post("/dp", auth, dpUpload, userController.setUserDp);

module.exports = router;
