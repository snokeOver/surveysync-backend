import UserModel from "../../shcemas/userSchema.js";
import errorHandler from "../helper/errorHandler.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const response = await UserModel.find();

    res.status(200).send({
      message: "Users retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
