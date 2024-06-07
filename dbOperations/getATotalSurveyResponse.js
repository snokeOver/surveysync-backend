import SurveyResponseModel from "../shcemas/surveyResponseSchema.js";
import errorHandler from "./helper/errorHandler.js";

export const getATotalSurveyResponse = async (req, res, next) => {
  try {
    const response = await SurveyResponseModel.findOne({
      surveyId: req.query.dataId,
    });

    res.status(200).send({
      message: "Survey Response retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
