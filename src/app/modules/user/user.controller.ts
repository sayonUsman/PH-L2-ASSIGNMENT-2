import { Request, Response } from "express";
import userValidationSchema from "./user.validation";
import { UserServices } from "./user.services";

const saveNewUserInfo = async (req: Request, res: Response) => {
  try {
    const newUserInfo = req.body;

    // validate user information
    const validUserInfo = userValidationSchema.safeParse(newUserInfo);

    // send response
    if (validUserInfo.success) {
      const result = await UserServices.saveNewUserInfoToDB(validUserInfo.data);

      res.status(200).json({
        success: true,
        message: "User created successfully!",
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Something went wrong!!!",
        error: {
          code: 404,
          description: validUserInfo.error,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!!!",
      error: {
        code: 404,
        description: error,
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!!!",
      error: {
        code: 404,
        description: error,
      },
    });
  }
};

export const UserControllers = {
  saveNewUserInfo,
  getAllUsers,
};
