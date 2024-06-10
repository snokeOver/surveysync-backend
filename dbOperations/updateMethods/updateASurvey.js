import SurveyModel from "../../shcemas/surveySchema.js";
import errorHandler from "../helper/errorHandler.js";

export const updateASurvey = async (req, res, next) => {
  const { title, description, deadline, category } = req.body;
  const updateFields = {
    ...(title && { title }),
    ...(description && { description }),
    ...(deadline && { deadline }),
    ...(category && { category }),
    updatedAt: Date.now(),
  };
  try {
    const survey = await SurveyModel.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields }, // This ensures that only the fields specified in the updateFields will be affected and others will remain unharm
      { new: true } //This ensured that it returns the updated document rather than the original one
    );

    if (!survey) {
      return res.status(404).send({
        message: "Survey not found!",
      });
    }

    res.status(200).send({
      message: "Survey updated successfully!",
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
