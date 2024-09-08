import SurveyResponseModel from "../../shcemas/surveyResponseSchema.js";
import errorHandler from "../helper/errorHandler.js";

export const getUserStatistics = async (req, res, next) => {
  try {
    const result = await SurveyResponseModel.aggregate([
      {
        $unwind: "$userResponses",
      },
      {
        $match: { "userResponses.userId": req.params.id },
      },
      {
        $group: {
          _id: "$userResponses.userId",
          Responses: { $sum: 1 },
          Comments: {
            $sum: {
              $cond: [{ $ne: ["$userResponses.comment", ""] }, 1, 0],
            },
          },
          votes: {
            $sum: {
              $cond: [{ $ne: ["$userResponses.vote", ""] }, 1, 0],
            },
          },
          preferences: {
            $sum: {
              $cond: [{ $ne: ["$userResponses.preference", ""] }, 1, 0],
            },
          },
        },
      },
    ]);

    const { _id, ...response } = result[0];
    // console.log(response);

    res.status(200).send({
      message: "Admin feedbacks retrieve successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
