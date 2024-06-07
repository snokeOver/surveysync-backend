import AdminFeedbackModel from "../shcemas/adminFeedbackSchema.js";
import errorHandler from "./helper/errorHandler.js";

export const getAdminFeedbacks = async (req, res, next) => {
  try {
    const response = await AdminFeedbackModel.find({
      surveyorId: req.params.uid,
    }).populate({
      path: "surveyId", //Based on which field it will populate
      select: "title status", //Include multiple fields seperated by space
      model: "allSurveys", //Explicitly specify the model to target
    });

    res.status(200).send({
      message: "Admin feedbacks retrieve successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
