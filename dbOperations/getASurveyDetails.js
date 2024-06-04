import SurveyModel from "../shcemas/surveySchema.js";
import errorHandler from "./errorHandler.js";

export const getASurveyDetails = async (req, res, next) => {
  try {
    const surveyDetail = await SurveyModel.findById(req.params.id);
    res.status(200).send({
      message: "SurveyDetail retrieved successfully!",
      surveyDetail,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
