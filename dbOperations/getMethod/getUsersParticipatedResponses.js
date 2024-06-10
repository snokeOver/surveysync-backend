import SurveyResponseModel from "../../shcemas/surveyResponseSchema.js";
import errorHandler from "../helper/errorHandler.js";

export const getUsersParticipatedResponses = async (req, res, next) => {
  const targetId = req.params.uid;
  try {
    const response = await SurveyResponseModel.aggregate([
      {
        $unwind: "$userResponses", // Unwind userResponses array to match individual elements
      },
      {
        $match: {
          "userResponses.userId": targetId,
          "userResponses.vote": { $in: ["YES", "NO"] },
        },
      },
      {
        $lookup: {
          from: "allsurveys",
          localField: "surveyId",
          foreignField: "_id",
          as: "surveyDetails",
          pipeline: [
            {
              $project: {
                title: 1, // Include other fields as needed
                category: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$surveyDetails", // Unwind the surveyDetails array to get a single object
      },
      {
        $group: {
          _id: "$_id",
          surveyDetails: { $first: "$surveyDetails" },
          userResponse: { $first: "$userResponses" },
        },
      },
      {
        $project: {
          _id: 1,
          surveyDetails: 1,
          userResponse: 1,
        },
      },
    ]);

    res.status(200).send({
      message: "Participated Surveys retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
