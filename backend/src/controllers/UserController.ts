import { Request, Response } from "express";
import { getIO } from "../libs/socket";

import CreateUserService from "../services/UserServices/CreateUserService";
import ListUsersService from "../services/UserServices/ListUsersService";
import ShowUserService from "../services/UserServices/ShowUserService";
import UpdateUserService from "../services/UserServices/UpdateUserService";
import DeleteUserService from "../services/UserServices/DeleteUserService";

import HttpStatus from "../validations/config/HttpStatus";

type IndexQuery = {
  searchParam: string;
  pageNumber: string;
};

export const index = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { searchParam, pageNumber } = req.query as IndexQuery;

    const { users, count, hasMore } = await ListUsersService({
      searchParam,
      pageNumber
    });

    return res.status(HttpStatus.OK).json({ users, count, hasMore });
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.params;

    const user = await ShowUserService(userId);

    return res.status(HttpStatus.OK).json(user);
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password, name, profile, customer, queueIds } = req.body;

    const user = await CreateUserService({
      email,
      password,
      name,
      profile,
      customer,
      queueIds
    });

    const io = getIO();
    io.emit("user", {
      action: "create",
      user
    });

    return res.status(HttpStatus.CREATED).json(user);
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = req.params;
    const userData = req.body;

    const user = await UpdateUserService({ userData, userId });

    const io = getIO();
    io.emit("user", {
      action: "update",
      user
    });

    return res.status(HttpStatus.NO_CONTENT).json({ message: "User updated" });
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = req.params;

    await DeleteUserService(userId);

    const io = getIO();
    io.emit("user", {
      action: "delete",
      userId
    });

    return res.status(HttpStatus.NO_CONTENT).json({ message: "User deleted" });
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
};
