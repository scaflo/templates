import mongoose, { Schema } from "mongoose";


const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
    },
    token: {
      type: String,
    },
    profilePhoto: {
      url: String,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model("User", userSchema);
