import { Document } from "mongoose";

export interface User extends Document {
  readonly name: string,
  readonly firstName: string,
  readonly lastName: string,
  readonly password: string,
  readonly email: string,
  readonly age: number,
}