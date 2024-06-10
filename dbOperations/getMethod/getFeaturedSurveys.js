import SurveyModel from "../../shcemas/surveySchema.js";
import errorHandler from "../helper/errorHandler.js";

export const getFeaturedSurveys = async (req, res, next) => {
  try {
    const response = await SurveyModel.aggregate([
      {
        $addFields: {
          totalCount: { $sum: ["$yesCount", "$noCount"] }, // Compute the total count
        },
      },
      {
        $sort: { totalCount: -1 }, // Sort by total count in descending order
      },
      {
        $limit: 6, // Limit the result to six documents
      },
      {
        $project: {
          _id: 1,
          title: 1,
          yesCount: 1,
          noCount: 1,
          totalCount: 1,
          description: 1,
          deadline: 1,
          category: 1,
          status: 1,
          likeCount: 1,
          disLikeCount: 1,
          createdAt: 1,
          updatedAt: 1,
          commentCount: 1,
          reportCount: 1,
        },
      },
    ]);

    res.status(200).send({
      message: "RecentSurveys retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
