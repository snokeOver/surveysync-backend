import UserModel from "../shcemas/userSchema.js";
import errorHandler from "./errorHandler.js";

export const createUser = async (req, res, next) => {
  const userToSave = {
    userRole: req.body.role,
    userId: req.body.uid,
    email: req.body.email,
    name: req.body.name,
  };

  try {
    const user = new UserModel(userToSave);
    const savedUser = await user.save();
    res.status(200).send({
      Message: "Create User Success!",
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
