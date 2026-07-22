import mongoose, { Schema, model } from "mongoose";
const Schema = new Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      ref:"customer "
    },
  },
  {
    quantify: {
      type: Number,
    },
  },
  {
    purchaseDate: {
      type: Date,
    },
  },
  {
    total: {
      type: Number,
    },
  },
  {
    paymentStatus: {
      type: String,
    },
  },
  {
    trasactionId: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("ticketPurchase", Schema);
