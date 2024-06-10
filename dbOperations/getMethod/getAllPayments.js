import PaymentModel from "../../shcemas/userPaymentSchema.js";
import errorHandler from "../helper/errorHandler.js";

export const getAllPayments = async (req, res, next) => {
  try {
    const response = await PaymentModel.find().populate({
      path: "userId", //Based on which field it will populate
      select: "name email userRole", //Include multiple fields seperated by space
      model: "allUsers", //Explicitly specify the model to target
    });

    res.status(200).send({
      message: "Payments retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
