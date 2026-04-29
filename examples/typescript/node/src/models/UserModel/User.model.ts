import {
  USER_ROLE,
  USER_STATUS,
  type IRefreshToken,
} from "@/constants/user.constant.js";
import mongoose, { Schema, type Types, type HydratedDocument, type InferSchemaType } from "mongoose";
const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    tokenHash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    name: String,
    phone: { type: String},
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: { unique: true },
    },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.USER,
    },

    userStatus: {
      type: String,
      enum: Object.values(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },

    refreshTokens: {
      type: [refreshTokenSchema],
      default: [],
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model("User", userSchema);


// export type TUser = InferSchemaType<typeof userSchema>;
export type TUser = InferSchemaType<typeof userSchema> & {
  _id: Types.ObjectId;
};
export type TUserDocument = HydratedDocument<TUser>;