import { Request, Response } from "express";

import { AuthUserService, RefreshTokenService } from "../services";

import { SendRefreshToken } from "../helpers/SendRefreshToken";
import AppError from "../validations/config/AppError";

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  const { token, serializedUser, refreshToken } = await AuthUserService({
    email,
    password
  });

  SendRefreshToken(res, refreshToken);

  return res.status(200).json({
    token,
    user: serializedUser
  });
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token: string = req.cookies.jrt;

  if (!token) {
    throw new AppError("ERR_SESSION_EXPIRED", 401);
  }

  const { user, newToken, refreshToken } = await RefreshTokenService(
    res,
    token
  );

  SendRefreshToken(res, refreshToken);

  return res.json({ token: newToken, user });
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  res.clearCookie("jrt");

  return res.send();
};
