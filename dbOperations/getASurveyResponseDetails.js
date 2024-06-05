import SurveyModel from "../shcemas/surveySchema.js";
import errorHandler from "./helper/errorHandler.js";

import { findASpecificUserResponse } from "./helper/findASpecificUserResponse.js";

export const getASurveyResponseDetails = async (req, res, next) => {
  try {
    const surveyResponse = await findASpecificUserResponse(
      req.params.id,
      req.query.userId
    );

    res.status(200).send({
      message: "SurveyDetail retrieved successfully!",
      surveyResponse,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
