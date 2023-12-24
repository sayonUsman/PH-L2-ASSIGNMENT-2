import { Schema, model } from "mongoose";
import {
  TAddress,
  TFullName,
  TOrders,
  TUser,
  TUserMethods,
  UserModel,
} from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const ordersSchema = new Schema<TOrders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser, UserModel, TUserMethods>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: fullNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
  hobbies: { type: [String], required: true },
  address: { type: addressSchema, required: true },
  orders: { type: [ordersSchema] },
});

// middlewares
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

// instance methods
userSchema.methods.isUserExist = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>("User", userSchema);
