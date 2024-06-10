import errorHandler from "../helper/errorHandler.js";
import Stripe from "stripe";

export const createAPaymentIntent = async (req, res, next) => {
  const stripe_key = process.env.STRIPE_SECRET;
  const stripe = new Stripe(stripe_key);
  const amount = parseInt(req.body.price * 100);

  try {
    if (amount <= 0) {
      res.status(500).send({
        message: "Filed to create Payment Intent!",
      });
    }
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(200).send({
      message: "Payment Intent created successfully!",
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
