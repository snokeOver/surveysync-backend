import SurveyResponseModel from "../shcemas/surveyResponseSchema.js";
import errorHandler from "./helper/errorHandler.js";

export const getUsersReportedSurveys = async (req, res, next) => {
  const targetId = req.params.uid;
  try {
    const response = await SurveyResponseModel.find(
      {
        "userResponses.userId": targetId,
      },
      {
        surveyId: 1,
        userResponses: {
          $elemMatch: { userId: targetId, reportStatus: "Reported" },
        },
      }
    ).populate({
      path: "surveyId",
      select: "title category",
      model: "allSurveys",
    });

    res.status(200).send({
      message: "Participated Surveys retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
