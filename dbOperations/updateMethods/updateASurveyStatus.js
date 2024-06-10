import AdminFeedbackModel from "../../shcemas/adminFeedbackSchema.js";
import SurveyModel from "../../shcemas/surveySchema.js";
import errorHandler from "../helper/errorHandler.js";
import mongoose from "mongoose";

export const updateASurveyStatus = async (req, res, next) => {
  const { status, feedback, surveyorId } = req.body;
  const updateFields = {
    ...(status && { status }),
    updatedAt: Date.now(),
  };

  const feedbackFieldsToCreate = {
    surveyId: mongoose.Types.ObjectId.createFromHexString(req.params.id),
    surveyorId: surveyorId,
    adminFeedbacks: [],
    updatedAt: Date.now(),
  };

  const feedbackDataForArray = {
    ...(status && { status }),
    ...(feedback && { feedback }),
    createdAt: Date.now(),
  };

  try {
    // ---------------------- Update SurveyModel -------------------------//
    const updateSurvey = await SurveyModel.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields }, // This ensures that only the fields specified in the updateFields will be affected and others will remain unharm
      { new: true } //This ensured that it returns the updated document rather than the original one
    );

    if (!updateSurvey) {
      return res.status(404).send({
        message: "Survey not found!",
      });
    }

    // ---------------------- Update AdminFeedbackModel -------------------------//
    //  first, try to find. If not found then create one then update. If found then update
    const existedFeedback = await AdminFeedbackModel.findOne({
      surveyId: req.params.id,
    });

    let targetId = "";

    // If no data found then create a sample data with empty array
    if (existedFeedback === null) {
      const feedbackData = new AdminFeedbackModel(feedbackFieldsToCreate);
      const createdFeedback = await feedbackData.save();

      targetId = createdFeedback._id.valueOf();
    } else {
      targetId = existedFeedback._id.valueOf();
    }

    // Now Perfome update operation on AdminFeedbackModel array
    const newResponse = await AdminFeedbackModel.findByIdAndUpdate(
      targetId,
      { $push: { adminFeedbacks: feedbackDataForArray } },
      { new: true } // This ensures the updated document is returned
    );
    // console.log(newResponse);

    res.status(200).send({
      message: "Survey Status updated successfully!",
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
