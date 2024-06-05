import SurveyResponseModel from "../../shcemas/surveyResponseSchema.js";
import mongoose from "mongoose";

export const findASpecificUserResponse = async (surveyId, userId) => {
  const surveyResponseDetail = await SurveyResponseModel.aggregate([
    {
      $match: {
        surveyId: mongoose.Types.ObjectId.createFromHexString(surveyId),
        "userResponses.userId": userId,
      },
    },
    {
      $project: {
        userResponses: {
          $filter: {
            input: "$userResponses",
            as: "response",
            cond: { $eq: ["$$response.userId", userId] },
          },
        },
      },
    },
  ]);

  return surveyResponseDetail.length > 0
    ? surveyResponseDetail[0].userResponses[0]
    : null;
};
