import SurveyResponseModel from "../shcemas/surveyResponseSchema.js";
import errorHandler from "./helper/errorHandler.js";

export const getUsersParticipatedResponses = async (req, res, next) => {
  const targetId = req.params.uid;
  try {
    const response = await SurveyResponseModel.find(
      {
        "userResponses.userId": targetId,
      },
      {
        surveyId: 1,
        userResponses: { $elemMatch: { userId: targetId } },
      }
    ).populate({
      path: "surveyId",
      select: "title",
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
