import SurveyResponseModel from "../../shcemas/surveyResponseSchema.js";
import SurveyModel from "../../shcemas/surveySchema.js";
import { findASpecificUserResponse } from "./findASpecificUserResponse.js";
import { updateSurveyForSurveyModel } from "./updateSurveyForSurveyModel.js";
import { updateSurveyForSurveyResponseModel } from "./updateSurveyForSurveyResponseModel.js";

export const updateBothSurveyModel = async (fieldName, targetId, req) => {
  const { userId, name, email, vote, preference, reportStatus, comment } =
    req.body;

  // Determine the dynamic field to update in userInfoForUpdate
  const dynamicFieldToUpdate = vote
    ? "vote"
    : preference
    ? "preference"
    : reportStatus
    ? "reportStatus"
    : comment
    ? "comment"
    : null;

  const userInfoForUpdate = {
    ...(userId && { userId }),
    ...(name && { name }),
    ...(email && { email }),
    ...(vote && { vote }),
    ...(reportStatus && { reportStatus }),
    ...(preference && { preference }),
    ...(comment && { comment }),
    updatedAt: Date.now(),
  };

  // Check if the user's response already exists in the array, if exists get that response data for inspection
  const surveyResponse = await findASpecificUserResponse(
    req.body.surveyId,
    req.body.userId
  );

  if (surveyResponse === null) {
    // Push operation to add a new element to the array of SurveyResponseModel
    const newResponse = await SurveyResponseModel.findByIdAndUpdate(
      targetId,
      { $push: { userResponses: userInfoForUpdate } },
      { new: true } // This ensures the updated document is returned
    );
    // console.log(newResponse);

    // Update SurveyModel Part
    const survey = await SurveyModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { [fieldName]: 1 } }, //example: Increment yesCount/noCount by 1
      { new: true }
    );
  } else {
    // update operation on array of surveyResponseModel

    const payloadData = vote || preference || comment || reportStatus || "";

    // parameters are: surveyID of surveyResponseSchema, Id of current user, fieldName of surveySchema, currentData of the user from surveyResponseSchema array, dynamic field to update at surveyResponseSchema, the data(comment) to be saved
    const updatedSurveyResponseModel = await updateSurveyForSurveyResponseModel(
      targetId,
      userId,
      fieldName,
      surveyResponse[dynamicFieldToUpdate],
      dynamicFieldToUpdate,
      payloadData
    );

    // console.log(updatedSurveyResponseModel);

    //------- update operation on data from surveyModel ----------------------//

    // parameters are: surveyID of surveySchema, fieldName of surveySchema, currentData of the user from surveyResponseSchema array, dynamic field to update at surveyResponseSchema, the data(comment) to be saved
    const updatedSurveyModel = await updateSurveyForSurveyModel(
      req.params.id,
      fieldName,
      surveyResponse[dynamicFieldToUpdate],
      payloadData
    );
  }
};
