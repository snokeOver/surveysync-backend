import SurveyResponseModel from "../shcemas/surveyResponseSchema.js";
import SurveyModel from "../shcemas/surveySchema.js";
import errorHandler from "./helper/errorHandler.js";

export const createSurvey = async (req, res, next) => {
  const surveyToSave = {
    surveyorId: req.body.surveyorId,
    title: req.body.title,
    description: req.body.description,
    deadline: req.body.deadline,
    category: req.body.category,
  };

  try {
    const survey = new SurveyModel(surveyToSave);
    const savedSurvey = await survey.save();

    // If survey is saved successfully, create a corresponding survey response
    const payload = {
      surveyId: savedSurvey._id, // Corrected accessing saved survey ID
      userResponses: [],
    };

    const surveyResponse = new SurveyResponseModel(payload);
    await surveyResponse.save(); // Save survey response

    res.status(200).send({
      message: "Survey and Survey-response created successfully!",
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
