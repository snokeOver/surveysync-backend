import SurveyModel from "../shcemas/surveySchema.js";
import errorHandler from "./errorHandler.js";

export const deleteASurvey = async (req, res, next) => {
  try {
    const survey = await SurveyModel.findByIdAndDelete(req.params.id);
    if (!survey) {
      return res.status(404).send({
        message: "Survey not found!",
      });
    }
    res.status(200).send({
      message: "Survey deleted successfully!",
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
