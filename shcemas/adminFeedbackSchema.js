import mongoose, { Schema } from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["Published", "Unpublished"],
      required: true,
    },

    feedback: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
  },
  { _id: false }
);

const adminFeedbackSchema = new mongoose.Schema({
  surveyId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "allSurveys", //Reference to the "allSurveys" collection exactly as in the schema
  },

  surveyorId: {
    type: String,
    required: true,
  },

  adminFeedbacks: [feedbackSchema], // Embedding feedbackSchema

  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

// the collection name ends with (s)
const AdminFeedbackModel = mongoose.model(
  "allAdminFeedbacks",
  adminFeedbackSchema
);
export default AdminFeedbackModel;
