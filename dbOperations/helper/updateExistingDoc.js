import SurveyModel from "../../shcemas/surveySchema.js";
import UserModel from "../../shcemas/userSchema.js";
import errorHandler from "./errorHandler.js";

export const updateExistingDoc = async (req, res, next) => {
  const newField = {
    userRequest: "",
  };

  try {
    const result = await UserModel.updateMany({}, { $set: newField });

    res.status(200).send({
      message: "All Document Updated successfully!",
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
