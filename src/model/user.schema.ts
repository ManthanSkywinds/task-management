import { Schema, model as Model } from "mongoose";
import { Tables } from "../config/tables";

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    fullName: {
      type: String,
    },
    mobile_no: {
      type: String,
    }
  },
  { timestamps: true }
);

const user = Model(Tables.user, userSchema);
export default user;
