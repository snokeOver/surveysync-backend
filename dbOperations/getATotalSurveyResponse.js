import SurveyResponseModel from "../shcemas/surveyResponseSchema.js";
import SurveyModel from "../shcemas/surveySchema.js";
import errorHandler from "./helper/errorHandler.js";

export const getATotalSurveyResponse = async (req, res, next) => {
  try {
    const surveyResponse = await SurveyResponseModel.findOne({
      surveyId: req.params.id,
    });

    res.status(200).send({
      message: "Survey Response retrieved successfully!",
      surveyResponse,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
