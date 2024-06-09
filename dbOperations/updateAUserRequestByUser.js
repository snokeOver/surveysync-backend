import UserModel from "../shcemas/userSchema.js";
import errorHandler from "./helper/errorHandler.js";

export const updateAUserRequestByUser = async (req, res, next) => {
  const { userRequest } = req.body;
  const updateFields = {
    ...(userRequest && { userRequest }),
    updatedAt: Date.now(),
  };

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.uid,
      { $set: updateFields }, // This ensures that only the fields specified in the updateFields will be affected and others will remain unharm
      { new: true } //This ensured that it returns the updated document rather than the original one
    );

    if (!updatedUser) {
      return res.status(404).send({
        message: "User not found!",
      });
    }

    res.status(200).send({
      message: "User Request updated successfully!",
      updatedUser,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
