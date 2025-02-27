// import { UserInterface } from "@/types/agent";
import mongoose, { Schema } from "mongoose";
import { UserInterface } from "src/types/agent";

const UserSchema: Schema = new Schema<UserInterface>(
  {
    fullName: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
      default: "",
    },
    email: {
      type: String,
      index: { unique: true },
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    domain: {
      type: String,
      required: false,
    },
    browserLimit: {
      type: Number,
      required: true, // Default limit of 1 browser
    },
    // isActive: {
    //   type: Boolean,
    //   default: true,
    // },
    isVerified: { type: Boolean, default: false },
    jwt: {
      type: String,
      required: false,
    },
    wix: {
      type: Boolean,
      default: false,
      required: false,
    },
    wixDomain: {
      type: String,
      required: false,
    },
    wixInstanceId: {
      type: String,
      required: false,
    },
    wixRefreshToken: {
      type: String,
      required: false,
    },
    wixScriptAdded: {
      type: Boolean,
      default: false,
      required: false,
    },
    role:{
      type: String,
      required: false,
    },
    // plan: {
    //   type: String,
    //   required: true,
    // },
    installed: {
      type: Boolean,
      required: false,
    },
    // widget_type: {
    //   type: String,
    //   required: true,
    // },
    disabled: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models?.User || mongoose.model<UserInterface>("User", UserSchema);

export default User;
