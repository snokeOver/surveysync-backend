import mongoose, { Schema } from "mongoose";

const userResponseSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    vote: {
      type: String,
      enum: ["YES", "NO"],
    },
    preference: {
      type: String,
      enum: ["LIKE", "DISLIKE"],
    },
    comment: {
      type: String,
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    updatedAt: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { _id: false }
);

const surveyResponseSchema = new mongoose.Schema({
  surveyId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "allSurveys", //Reference to the "allSurveys" collection exactly as in the schema
  },

  userResponses: [userResponseSchema], // Embedding userResponseSchema
});

// the collection name ends with (s)
const SurveyResponseModel = mongoose.model(
  "allSurveyResponses",
  surveyResponseSchema
);
export default SurveyResponseModel;
