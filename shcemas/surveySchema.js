import mongoose from "mongoose";

const surveySchema = new mongoose.Schema({
  surveyorId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Published",
  },
  yesCount: {
    type: Number,
    default: 0,
  },
  noCount: {
    type: Number,
    default: 0,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  disLikeCount: {
    type: Number,
    default: 0,
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
});

// the collection name ends with (s)
const SurveyModel = mongoose.model("allSurveys", surveySchema);
export default SurveyModel;
