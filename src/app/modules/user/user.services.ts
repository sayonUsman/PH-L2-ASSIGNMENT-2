import { TUser } from "./user.interface";
import { User } from "./user.model";

const saveNewUserInfoToDB = async (userInfo: TUser) => {
  const user = new User(userInfo);
  const result = await user.save();
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find().select(
    "-_id -userId -password -isActive -hobbies -orders"
  );
  return result;
};

export const UserServices = { saveNewUserInfoToDB, getAllUsersFromDB };
