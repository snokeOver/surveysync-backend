import SurveyModel from "../shcemas/surveySchema.js";
import errorHandler from "./helper/errorHandler.js";

import { findASpecificUserResponse } from "./helper/findASpecificUserResponse.js";
export const getASurveyDetails = async (req, res, next) => {
  try {
    const surveyDetail = await SurveyModel.findById(req.params.id);

    const surveyResponse = await findASpecificUserResponse(
      req.params.id,
      req.query.userId
    );

    // Construct the merged response object
    const mergedResponse = {
      surveyDetail,
      surveyResponse,
    };

    console.log("From getASurveyDetils:", mergedResponse);

    res.status(200).send({
      message: "SurveyDetail retrieved successfully!",
      mergedResponse,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
