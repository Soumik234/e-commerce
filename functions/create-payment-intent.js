
require("dotenv").config();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

const formatPrice = (number) => {
  return Math.round((number / 3) * 100); 
};

exports.handler = async function (event, context) {
  const { shipping_fee, total_amount } = JSON.parse(event.body);

  const calculateOrderAmount = () => {
    return formatPrice(shipping_fee + total_amount);
  };

  const rawAmount = calculateOrderAmount();

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: rawAmount,
      currency: "INR",
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
};
