import FAQModel from "../../shcemas/faqSchema.js";
import errorHandler from "../helper/errorHandler.js";

export const getFAQData = async (req, res, next) => {
  try {
    const response = await FAQModel.find();

    res.status(200).send({
      message: "FAQ data retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
