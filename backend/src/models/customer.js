import { Schema, model } from "mongoose";
const Schema = new Schema(
  {
    name: {
      type: Sting,
    },
  },
  {
    email: {
      type: Sting,
    },
  },
  {
    password: {
      type: Sting,
    },
  },
  {
    isVerified: {
      type: Boolean,
    },
  },
  {
    LoginAttempts: {
      type: Number,
    },
  },
  {
    timeOut: {
      type: Date,
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("admin", Schema);
