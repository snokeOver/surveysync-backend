import SurveyModel from "../shcemas/surveySchema.js";
import errorHandler from "./errorHandler.js";

export const getSurveyorsSurveys = async (req, res, next) => {
  try {
    const surveys = await SurveyModel.find({
      surveyorId: req.params.sid,
    });
    res.status(200).send({
      message: "Surveys retrieved successfully!",
      surveys,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
