import SurveyModel from "../shcemas/surveySchema.js";
import errorHandler from "./errorHandler.js";

export const getASurveyResponse = async (req, res, next) => {
  try {
    const response = await SurveyModel.find({
      surveyorId: req.params.id,
    });
    res.status(200).send({
      message: "SurveyResponse retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
