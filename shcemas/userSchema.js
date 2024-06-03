import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userRole: {
    type: String,
    required: true,
    default: "User",
  },
  userId: {
    type: String,
    unique: true,
    required: true,
    default: "User",
  },
  name: {
    type: String,
    lowercase: true,
  },

  email: {
    type: String,
    unique: true,
    lowercase: true,
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
const UserModel = mongoose.model("allUsers", userSchema);
export default UserModel;
