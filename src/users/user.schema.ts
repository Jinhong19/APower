import { Schema } from "mongoose";

export const UserSchema = new Schema({
  name: String,
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  age: Number,
});
