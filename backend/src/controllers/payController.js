const User = require("../models/User");
const stripe = require("stripe")(process.env.STRIPE_KEY);

module.exports.getPay = async (req, res) => {
  return res.status(401).json({ msg: "Not Authorized" });
};

module.exports.postPay = async (req, res) => {
  const { product } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.price * 100,
      currency: "inr",
      payment_method_types: ["card"],
    });
    return res.json(paymentIntent);
  } catch (err) {
    return res.status(400).send({
      error: {
        message: err.message,
      },
    });
  }
};
module.exports.confirmPay = async (req, res) => {
  const { user_id } = req.body;
  const user = await User.findById(user_id);
  if (user) {
    await User.updateOne({ _id: user_id }, { $set: { isPremium: true } });
  }
  return res.json({ msg: "You are now a Subscriber" });
};
