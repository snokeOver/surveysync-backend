import SurveyResponseModel from "../../shcemas/surveyResponseSchema.js";
import SurveyModel from "../../shcemas/surveySchema.js";
import errorHandler from "../helper/errorHandler.js";
import { findASpecificUserResponse } from "../helper/findASpecificUserResponse.js";
import { updateSurveyForSurveyModel } from "../helper/updateSurveyForSurveyModel.js";
import { updateSurveyForSurveyResponseModel } from "../helper/updateSurveyForSurveyResponseModel.js";

export const updateASurveyResponse = async (req, res, next) => {
  const payload = {
    surveyId: req.body.surveyId,
    userResponses: [],
  };

  // Handle the Update data on vote
  const updateSurResOnVote = async (fieldName, targetId) => {
    // Update surveyResponse Part
    const { userId, name, email, vote, preference, comment } = req.body;

    const userInfoForUpdate = {
      ...(userId && { userId }),
      ...(name && { name }),
      ...(email && { email }),
      ...(vote && { vote }),
      ...(preference && { preference }),
      ...(comment && { comment }),
      updatedAt: Date.now(),
    };

    // Check if the user's response already exists in the array, if exists get that response data for inspection
    const surveyResponse = await findASpecificUserResponse(
      req.body.surveyId,
      req.body.userId
    );

    // console.log(surveyResponse);
    if (surveyResponse === null) {
      // Push operation to add a new element to the array of SurveyResponseModel
      const newResponse = await SurveyResponseModel.findByIdAndUpdate(
        targetId,
        { $push: { userResponses: userInfoForUpdate } },
        { new: true } // This ensures the updated document is returned
      );
      console.log(newResponse);
      // Update SurveyModel Part
      const survey = await SurveyModel.findByIdAndUpdate(
        req.params.id,
        { $inc: { [fieldName]: 1 } }, // Increment yesCount/noCount by 1
        { new: true }
      );
    } else {
      // update Opearation on array of surveyResponseModel

      const updatedSurveyResponseModel =
        await updateSurveyForSurveyResponseModel(
          targetId,
          userId,
          fieldName,
          surveyResponse.vote
        );

      console.log(updatedSurveyResponseModel);

      // update Opearation on data from surveyModel
      const updatedSurveyModel = await updateSurveyForSurveyModel(
        req.params.id,
        fieldName,
        surveyResponse.vote
      );
    }
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
        await updateSurResOnVote("yesCount", targetId.valueOf());
      } else if (req.body.vote === "NO") {
        await updateSurResOnVote("noCount", targetId.valueOf());
      }
    }

    // update for preference (LIKE/DISLIKE)
    if (req.body.preference) {
      if (req.body.preference === "LIKE") {
        await updateSurResOnVote("likeCount", targetId.valueOf());
      } else if (req.body.preference === "DISLIKE") {
        await updateSurResOnVote("disLikeCount", targetId.valueOf());
      }
    }

    res.status(200).send({
      message: "Survey updated successfully!",
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
