import SurveyResponseModel from "../../shcemas/surveyResponseSchema.js";
import SurveyModel from "../../shcemas/surveySchema.js";
import errorHandler from "../helper/errorHandler.js";

export const deleteASurvey = async (req, res, next) => {
  try {
    const deleteSurvey = await SurveyModel.findByIdAndDelete(req.params.id);
    if (!deleteSurvey) {
      return res.status(404).send({
        message: "Survey not found!",
      });
    }

    const deleteSurveyResponse = await SurveyResponseModel.deleteOne({
      surveyId: req.params.id,
    });

    if (deleteSurveyResponse.deletedCount === 0) {
      return res.status(404).send({
        message: "Survey response not found and delete failed!",
      });
    }

    res.status(200).send({
      message: "Survey deleted successfully!",
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
