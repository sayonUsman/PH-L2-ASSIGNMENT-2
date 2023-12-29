import { TOrders, TUser } from "./user.interface";
import { User } from "./user.model";

const saveNewUserInfoToDB = async (userInfo: TUser) => {
  const user = new User(userInfo);

  if (await user.isUserExist(userInfo.userId)) {
    throw new Error("User already exists!");
  } else {
    const result = await user.save();
    return result;
  }
};

const getAllUsersFromDB = async () => {
  const result = await User.find().select(
    "-_id -userId -password -isActive -hobbies -orders"
  );
  return result;
};

const getUserFromDB = async (userId: number) => {
  const user = new User();

  if (await user.isUserExist(userId)) {
    const result = await User.findOne({ userId }).select(
      "-_id -password -orders"
    );
    return result;
  } else {
    throw new Error("User not found!");
  }
};

const updateAndSaveUserInfoToDB = async (userInfo: TUser, userId: number) => {
  const user = new User();

  if (await user.isUserExist(userId)) {
    const result = await User.updateOne({ userId }, { $set: userInfo });
    return result;
  } else {
    throw new Error("User not found!");
  }
};

const deleteUserFromDB = async (userId: number) => {
  const user = new User();

  if (await user.isUserExist(userId)) {
    const result = await User.deleteOne({ userId });
    return result;
  } else {
    throw new Error("User not found!");
  }
};

const addOrderOrUpdateOrderToDB = async (orders: TOrders, userId: number) => {
  const user = new User();

  if (await user.isUserExist(userId)) {
    const result = await User.updateOne({ userId }, { $push: orders });
    return result;
  } else {
    throw new Error("User not found!");
  }
};

const getUserAllOrderFromDB = async (userId: number) => {
  const user = new User();

  if (await user.isUserExist(userId)) {
    const result = await User.findOne({ userId }).select(
      "-_id -userId -username -password -fullName -age -email -isActive -hobbies -address -__v"
    );
    return result;
  } else {
    throw new Error("User not found!");
  }
};

const getUserToCalculateTotalPriceOfOrder = async (userId: number) => {
  const user = new User();

  if (await user.isUserExist(userId)) {
    const result = await User.findOne({ userId }).select(
      "-_id -userId -username -password -fullName -age -email -isActive -hobbies -address -__v"
    );
    return result;
  } else {
    throw new Error("User not found!");
  }
};

export const UserServices = {
  saveNewUserInfoToDB,
  getAllUsersFromDB,
  getUserFromDB,
  updateAndSaveUserInfoToDB,
  deleteUserFromDB,
  addOrderOrUpdateOrderToDB,
  getUserAllOrderFromDB,
  getUserToCalculateTotalPriceOfOrder,
};
