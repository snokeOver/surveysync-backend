import UserModel from "../shcemas/userSchema.js";
import errorHandler from "./helper/errorHandler.js";

export const getUserRole = async (req, res, next) => {
  try {
    const response = await UserModel.findOne({
      userId: req.params.id,
    });

    res.status(200).send({
      message: "user retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
