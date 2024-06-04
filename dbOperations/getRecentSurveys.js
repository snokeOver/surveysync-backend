import SurveyModel from "../shcemas/surveySchema.js";
import errorHandler from "./errorHandler.js";

export const getRecentSurveys = async (req, res, next) => {
  try {
    const recentSurveys = await SurveyModel.find({})
      .sort({ createdAt: -1 }) // Sort by `createdAt` field in descending order
      .limit(6); // Limit the result to six documents

    res.status(200).send({
      message: "RecentSurveys retrieved successfully!",
      recentSurveys,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
