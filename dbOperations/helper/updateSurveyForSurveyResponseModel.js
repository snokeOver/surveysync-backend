import SurveyResponseModel from "../../shcemas/surveyResponseSchema.js";

export const updateSurveyForSurveyResponseModel = async (
  targetId,
  userId,
  fieldName,
  currentData,
  dynamicField,
  payloadData
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

  // Logic for Report Status (Reported/NotReported)
  if (fieldName === "reportCount") {
    newData =
      !currentData || currentData === "NotReported"
        ? "Reported"
        : "NotReported";
  }

  // Logic for comment
  if (fieldName === "commentCount") {
    newData = payloadData;
  }

  // Update the querray based on the newData and dynamicField
  const updateQuery = {};
  updateQuery["userResponses.$." + dynamicField] = newData;

  // Now update the exact field with the new Value
  const updatedResponse = await SurveyResponseModel.findOneAndUpdate(
    { _id: targetId, "userResponses.userId": userId }, //Define which object of array to target
    { $set: updateQuery },
    { new: true }
  );
  // console.log(updatedResponse);
  return updatedResponse;
};
