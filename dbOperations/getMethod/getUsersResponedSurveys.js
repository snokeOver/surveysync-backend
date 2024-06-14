import SurveyResponseModel from "../../shcemas/surveyResponseSchema.js";
import SurveyModel from "../../shcemas/surveySchema.js";
import errorHandler from "../helper/errorHandler.js";

export const getUsersResponedSurveys = async (req, res, next) => {
  try {
    // Step 1: Retrieve surveys based on the surveyorId
    const surveys = await SurveyModel.find({
      $or: [{ yesCount: { $gt: 0 } }, { noCount: { $gt: 0 } }],
    });
    // If no surveys are found, send an empty response
    if (surveys.length === 0) {
      return res.status(200).send({
        message: "No surveys found for the given surveyor.",
        response: [],
      });
    }

    // Step 2: For each survey, count the number of matching userResponses and add as totalResponse
    const response = await Promise.all(
      surveys.map(async (survey) => {
        const [aggregateResult] = await SurveyResponseModel.aggregate([
          {
            $match: { surveyId: survey._id },
          },
          {
            $project: {
              surveyId: 1,
              totalResponse: { $size: "$userResponses" },
            },
          },
        ]);

        const totalResponse = aggregateResult
          ? aggregateResult.totalResponse
          : 0;

        return {
          ...survey.toObject(),
          totalResponse,
        };
      })
    );

    res.status(200).send({
      message: "Surveys retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
