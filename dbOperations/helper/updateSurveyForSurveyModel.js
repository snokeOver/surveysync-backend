import SurveyModel from "../../shcemas/surveySchema.js";

export const updateSurveyForSurveyModel = async (
  surveyId,
  fieldName,
  currentData,
  payloadData
) => {
  let newData = {};

  // Logic for vote (YES/NO)
  if (fieldName === "yesCount") {
    if (currentData === "YES") {
      // User already voted YES, decrease yesCount
      newData = { $inc: { yesCount: -1 } };
    } else if (currentData === "NO") {
      // User voted NO, decrease noCount and increase yesCount
      newData = { $inc: { yesCount: 1, noCount: -1 } };
    } else {
      // User has not voted, increase yesCount
      newData = { $inc: { yesCount: 1 } };
    }
  } else if (fieldName === "noCount") {
    if (currentData === "YES") {
      // User voted YES, decrease yesCount and increase noCount
      newData = { $inc: { yesCount: -1, noCount: 1 } };
    } else if (currentData === "NO") {
      // User already voted NO, decrease noCount
      newData = { $inc: { noCount: -1 } };
    } else {
      // User has not voted, increase noCount
      newData = { $inc: { noCount: 1 } };
    }
  }

  // Logic for preference(LIKE/DISLIKE)
  if (fieldName === "likeCount") {
    if (currentData === "LIKE") {
      // User already voted LIKE, decrease likeCount
      newData = { $inc: { likeCount: -1 } };
    } else if (currentData === "DISLIKE") {
      // User voted DISLIKE, decrease disLikeCount and increase likeCount
      newData = { $inc: { likeCount: 1, disLikeCount: -1 } };
    } else {
      // User has not voted, increase likeCount
      newData = { $inc: { likeCount: 1 } };
    }
  } else if (fieldName === "disLikeCount") {
    if (currentData === "LIKE") {
      // User voted LIKE, decrease likeCount and increase disLikeCount
      newData = { $inc: { likeCount: -1, disLikeCount: 1 } };
    } else if (currentData === "DISLIKE") {
      // User already voted DISLIKE, decrease disLikeCount
      newData = { $inc: { disLikeCount: -1 } };
    } else {
      // User has not voted, increase disLikeCount
      newData = { $inc: { disLikeCount: 1 } };
    }
  }

  // Logic for Report status
  if (fieldName === "reportCount") {
    if (currentData === "Reported") {
      // User already Reported, decrease reportCount
      newData = { $inc: { reportCount: -1 } };
    } else {
      // User did not Reported, increase reportCount
      newData = { $inc: { reportCount: 1 } };
    }
  }

  // Logic for comment
  if (fieldName === "commentCount") {
    if (!currentData && payloadData !== null) {
      // User didn't comment on this survey yet
      newData = { $inc: { commentCount: 1 } };
    } else if (payloadData === null) {
      // User wants to delete his/her comment
      newData = { $inc: { commentCount: -1 } };
    }
  }

  const updatedSurvey = await SurveyModel.findByIdAndUpdate(surveyId, newData, {
    new: true,
  });

  return updatedSurvey;
};
