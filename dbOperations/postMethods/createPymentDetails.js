import PaymentModel from "../../shcemas/userPaymentSchema.js";
import UserModel from "../../shcemas/userSchema.js";
import errorHandler from "../helper/errorHandler.js";

export const createPymentDetails = async (req, res, next) => {
  const { userId, paidAmount, txId, packageName } = req.body;

  try {
    // First create payment details in PyentModdel

    const payment = new PaymentModel(req.body);
    const savedPayment = await payment.save();

    const updatedPyaload = {
      userRole: "ProUser",
      userRequest: "Accepted",
    };

    //  second update userRole in UserModel
    const updateUser = await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: updatedPyaload },
      { new: true }
    );

    res.status(200).send({
      message: "Payment created successfully!",
      response: { savedPayment, updateUser },
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
