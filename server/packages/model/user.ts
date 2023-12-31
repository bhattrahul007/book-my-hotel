import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltrounds = 10;
    const pwdSalt = await bcrypt.genSalt(saltrounds);
    const hashedPwd = await bcrypt.hash(this.password, pwdSalt);
    this.password = hashedPwd;
  }
  next();
});

export const UserModel = model<UserType>("UserModel", schema);
