import UserModel from "../shcemas/userSchema.js";
import errorHandler from "./helper/errorHandler.js";

export const updateAUserRole = async (req, res, next) => {
  const { userRole } = req.body;
  const updateFields = {
    ...(userRole && { userRole }),
    updatedAt: Date.now(),
  };

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields }, // This ensures that only the fields specified in the updateFields will be affected and others will remain unharm
      { new: true } //This ensured that it returns the updated document rather than the original one
    );

    if (!updatedUser) {
      return res.status(404).send({
        message: "User not found!",
      });
    }

    res.status(200).send({
      message: "User Role updated successfully!",
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
