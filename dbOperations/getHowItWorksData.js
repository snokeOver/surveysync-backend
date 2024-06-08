import FAQModel from "../shcemas/faqSchema.js";
import HowItWorksModel from "../shcemas/howItWorksSchema.js";
import errorHandler from "./helper/errorHandler.js";

export const getHowItWorksData = async (req, res, next) => {
  try {
    const response = await HowItWorksModel.find();

    res.status(200).send({
      message: "How-It-Works data retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
