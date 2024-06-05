import SurveyResponseModel from "../../shcemas/surveyResponseSchema.js";

export const updateSurveyForSurveyResponseModel = async (
  targetId,
  userId,
  fieldName,
  currentData,
  dynamicField
) => {
  let newData;

  // Logic for vote (YES?NO)
  if (fieldName === "yesCount") {
    newData = currentData === "YES" ? "" : "YES";
  } else if (fieldName === "noCount") {
    newData = currentData === "NO" ? "" : "NO";
  }

  // Logic for preference(LIKE/DISLIKE)
  if (fieldName === "likeCount") {
    newData = currentData === "LIKE" ? "" : "LIKE";
  } else if (fieldName === "disLikeCount") {
    newData = currentData === "DISLIKE" ? "" : "DISLIKE";
  }

  // Update the querray based on the newData and dynamicField
  const updateQuery = {};
  updateQuery["userResponses.$." + dynamicField] = newData;

  // Now update the exact field with the new Value
  const updatedResponse = await SurveyResponseModel.findOneAndUpdate(
    { _id: targetId, "userResponses.userId": userId },
    { $set: updateQuery },
    { new: true }
  );

  return updatedResponse;
};
