import errorHandler from "./helper/errorHandler.js";

import { findASpecificUserResponse } from "./helper/findASpecificUserResponse.js";

export const getASurveyResponseDetails = async (req, res, next) => {
  try {
    const response = await findASpecificUserResponse(
      req.query.dataId,
      req.params.uid
    );

    res.status(200).send({
      message: "SurveyDetail retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
