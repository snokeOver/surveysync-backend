import mongoose, { Schema } from "mongoose";

const userPaymentSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true,
    ref: "allusers", //Reference to the "allusers" collection exactly as in the schema
  },

  paidAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  txId: {
    type: String,
    required: true,
  },
  packageName: {
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
const PaymentModel = mongoose.model("paymentDetails", userPaymentSchema);
export default PaymentModel;
