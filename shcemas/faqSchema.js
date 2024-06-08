import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: {
    type: String,

    required: true,
  },

  answer: {
    type: String,

    required: true,
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
const FAQModel = mongoose.model("faqs", faqSchema);
export default FAQModel;
