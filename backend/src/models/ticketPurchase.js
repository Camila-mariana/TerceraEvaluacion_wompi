import mongoose, { Schema, model } from "mongoose";
const schema = new Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "customer",
    },
    quantity: {
      type: Number,
    },
    purchaseDate: {
      type: Date,
    },
    total: {
      type: Number,
    },
    paymentStatus: {
      type: String,
    },
    transactionId: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("ticketPurchase", schema);
