const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports.confirmEmail = async (req, res) => {
  const decoded = jwt.verify(req.params.emailToken, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(401).json({ msg: "User not verified, integrity lost" });
  }
  try {
    await User.updateOne(
      { _id: decoded.user.id },
      { $set: { isVerified: true } }
    );
    return res.redirect(`${process.env.BASE_FRONT_URL}/login`);
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "User not verified" });
  }
  //res.send("User Registered Successfully, Please verify your email to login");
};
