import { Request, Response } from "express";
import { getIO } from "../libs/socket";

import User from "../models/User";

import CreateUserService from "../services/UserServices/CreateUserService";
import ListUsersService from "../services/UserServices/ListUsersService";
import ShowUserService from "../services/UserServices/ShowUserService";
import UpdateUserService from "../services/UserServices/UpdateUserService";
import DeleteUserService from "../services/UserServices/DeleteUserService";

import AppError from "../errors/AppError";

type IndexQuery = {
  searchParam: string;
  pageNumber: string;
};

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { searchParam, pageNumber } = req.query as IndexQuery;

  const { users, count, hasMore } = await ListUsersService({
    searchParam,
    pageNumber
  });

  return res.json({ users, count, hasMore });
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password, name, profile, customer, queueIds } = req.body;

    if (req.url !== "/signup" && req.user.profile !== "admin") {
      const response = new AppError("ERR_NO_PERMISSION", 403);
      return res.status(403).json(response);
    }

    const nameExists = await User.findOne({ where: { name } });
    const emailExists = await User.findOne({ where: { email } });

    if (emailExists || nameExists) {
      return res.status(400).json("a");
    }

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

    return res.status(200).json(user);
  } catch (error) {
    return res.json(error);
  }
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = req.params;

  const user = await ShowUserService(userId);

  return res.status(200).json(user);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (req.user.profile !== "admin") {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  const { userId } = req.params;
  const userData = req.body;

  const user = await UpdateUserService({ userData, userId });

  const io = getIO();
  io.emit("user", {
    action: "update",
    user
  });

  return res.status(200).json(user);
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = req.params;

  if (req.user.profile !== "admin") {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  await DeleteUserService(userId);

  const io = getIO();
  io.emit("user", {
    action: "delete",
    userId
  });

  return res.status(200).json({ message: "User deleted" });
};
