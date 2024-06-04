import SurveyModel from "../shcemas/surveySchema.js";
import errorHandler from "./errorHandler.js";

export const updateExistingDoc = async (req, res, next) => {
  const newField = {
    commentCount: 0,
  };

  try {
    const result = await SurveyModel.updateMany({}, { $set: newField });

    res.status(200).send({
      message: "All Document Updated successfully!",
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
