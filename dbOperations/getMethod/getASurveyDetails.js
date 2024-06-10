import SurveyModel from "../../shcemas/surveySchema.js";
import errorHandler from "../helper/errorHandler.js";

export const getASurveyDetails = async (req, res, next) => {
  try {
    const response = await SurveyModel.findById(req.query.dataId);

    res.status(200).send({
      message: "SurveyDetail retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
