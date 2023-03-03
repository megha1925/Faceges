const payController = require("../../controllers/payController");
const express = require("express");
const router = express.Router();

const app = express();

const auth = require("../../middlewares/auth");

//@route GET /api/payment
router.get("/", auth, payController.getPay);

// @route POST /api/payment
router.post("/", auth, payController.postPay);

router.post("/confirm", auth, payController.confirmPay);

module.exports = router;
