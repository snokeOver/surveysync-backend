import SurveyModel from "../../shcemas/surveySchema.js";
import errorHandler from "../helper/errorHandler.js";

export const getRecentSurveys = async (req, res, next) => {
  try {
    const response = await SurveyModel.find({})
      .sort({ createdAt: -1 }) // Sort by `createdAt` field in descending order
      .limit(6); // Limit the result to six documents

    res.status(200).send({
      message: "RecentSurveys retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
