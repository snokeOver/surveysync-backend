import SurveyResponseModel from "../../shcemas/surveyResponseSchema.js";
import { updateBothSurveyModel } from "../helper/updateBothSurveyModel.js";
import errorHandler from "../helper/errorHandler.js";

export const updateASurveyResponse = async (req, res, next) => {
  const payload = {
    surveyId: req.body.surveyId,
    userResponses: [],
  };

  try {
    // First try to find the surveyResponse data
    const existedSurveyResponse = await SurveyResponseModel.findOne({
      surveyId: req.body.surveyId,
    });
    let targetId = "";

    // If no data found then create a sample data with empty array
    if (existedSurveyResponse === null) {
      const surveyResponse = new SurveyResponseModel(payload);
      const createResponse = await surveyResponse.save(); // Save survey response
      targetId = createResponse._id;
    } else {
      targetId = existedSurveyResponse._id;
    }

    // Now Perfome these update operation

    // Update for vote
    if (req.body.vote) {
      if (req.body.vote === "YES") {
        // parameters are: fieldName of surveySchema, surveyID of surveyResponseSchema, Response from API
        await updateBothSurveyModel("yesCount", targetId.valueOf(), req);
      } else if (req.body.vote === "NO") {
        await updateBothSurveyModel("noCount", targetId.valueOf(), req);
      }
    }

    // update for preference (LIKE/DISLIKE)
    if (req.body.preference) {
      if (req.body.preference === "LIKE") {
        // parameters are: fieldName of surveySchema, surveyID of surveyResponseSchema, Response from API
        await updateBothSurveyModel("likeCount", targetId.valueOf(), req);
      } else if (req.body.preference === "DISLIKE") {
        await updateBothSurveyModel("disLikeCount", targetId.valueOf(), req);
      }
    }

    // update for Report Status (Reported/NotReported)
    if (req.body.reportStatus) {
      // parameters are: fieldName of surveySchema, surveyID of surveyResponseSchema, Response from API
      await updateBothSurveyModel("reportCount", targetId.valueOf(), req);
    }

    // update for comment
    if (req.body.comment) {
      // parameters are: fieldName of surveySchema, surveyID of surveyResponseSchema, Response from API
      await updateBothSurveyModel("commentCount", targetId.valueOf(), req);
    }

    res.status(200).send({
      message: "Survey updated successfully!",
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
