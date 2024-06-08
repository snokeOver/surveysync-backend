import SurveyModel from "../shcemas/surveySchema.js";
import errorHandler from "./helper/errorHandler.js";

export const getAllSurveysForAdmin = async (req, res, next) => {
  try {
    const response = await SurveyModel.find();
    res.status(200).send({
      message: "Surveys retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
