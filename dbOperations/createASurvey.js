import SurveyModel from "../shcemas/surveySchema.js";
import errorHandler from "./errorHandler.js";

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
    res.status(200).send({
      message: "Survey created successfully!",
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
