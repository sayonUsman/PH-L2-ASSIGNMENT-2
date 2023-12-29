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
        message: "Something went wrong!",
        error: {
          code: 404,
          description: validUserInfo.error,
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: {
        code: 404,
        description: error?.message,
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: {
        code: 404,
        description: error?.message,
      },
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const userId: number = Number(req.params.userId);
    const result = await UserServices.getUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: {
        code: 404,
        description: error?.message,
      },
    });
  }
};

const updateAndSaveUserInfo = async (req: Request, res: Response) => {
  try {
    const newUserInfo = req.body;
    const userId = Number(req.params.userId);

    // validate user information
    const validUserInfo = userValidationSchema.safeParse(newUserInfo);

    // send response
    if (validUserInfo.success) {
      const result = await UserServices.updateAndSaveUserInfoToDB(
        validUserInfo.data,
        userId
      );

      res.status(200).json({
        success: true,
        message: "User updated successfully!",
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Something went wrong!",
        error: {
          code: 404,
          description: validUserInfo.error,
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: {
        code: 404,
        description: error?.message,
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId: number = Number(req.params.userId);
    const result = await UserServices.deleteUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: {
        code: 404,
        description: error?.message,
      },
    });
  }
};

const addOrderOrUpdateOrder = async (req: Request, res: Response) => {
  try {
    const orders = req.body;
    const userId = Number(req.params.userId);
    const result = await UserServices.addOrderOrUpdateOrderToDB(orders, userId);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: {
        code: 404,
        description: error?.message,
      },
    });
  }
};

const getUserAllOrder = async (req: Request, res: Response) => {
  try {
    const userId: number = Number(req.params.userId);
    const result = await UserServices.getUserAllOrderFromDB(userId);

    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: {
        code: 404,
        description: error?.message,
      },
    });
  }
};

const getUserTotalPriceOfOrder = async (req: Request, res: Response) => {
  try {
    const userId: number = Number(req.params.userId);
    const result = await UserServices.getUserToCalculateTotalPriceOfOrder(
      userId
    );

    if (result) {
      const totalPrice = result.orders?.map(
        (order) => order.price * order.quantity
      );

      if (totalPrice?.length !== 0) {
        const sum = totalPrice?.reduce((sum, price) => sum + price);

        res.status(200).json({
          success: true,
          message: "Total price calculated successfully!",
          data: {
            totalPrice: sum,
          },
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Total price calculated successfully!",
          data: {
            totalPrice: 0,
          },
        });
      }
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: {
        code: 404,
        description: error?.message,
      },
    });
  }
};

export const UserControllers = {
  saveNewUserInfo,
  getAllUsers,
  getUser,
  updateAndSaveUserInfo,
  deleteUser,
  addOrderOrUpdateOrder,
  getUserAllOrder,
  getUserTotalPriceOfOrder,
};
