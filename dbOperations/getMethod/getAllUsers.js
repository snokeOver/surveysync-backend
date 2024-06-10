import UserModel from "../../shcemas/userSchema.js";
import errorHandler from "../helper/errorHandler.js";

export const getAllUsers = async (req, res, next) => {
  const userRole = req?.query?.userRole || "";
  try {
    let response;
    if (userRole) {
      // If userRole is defined, filter users based on the role
      response = await UserModel.find({ userRole });
    } else {
      // If userRole is not defined, get all users
      response = await UserModel.find();
    }

    res.status(200).send({
      message: "Users retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
