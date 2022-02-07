import { Request, Response, NextFunction } from "express";
import * as Yup from "yup";

import User from "../../models/User";
import AppError from "../config/AppError";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required(new AppError("NAME_IS_REQUIRED").message)
        .min(6, new AppError("MIN_CARACHTERS_NAME").message)
        .max(30, new AppError("MAX_CARACHTERS_NAME").message)
        .test(
          "Check-name",
          new AppError("NAME_ALREADY_REGISTERED").message,
          async value => {
            if (!value) return false;
            const nameExists = await User.findOne({
              where: { name: value }
            });
            return !nameExists;
          }
        ),
      email: Yup.string()
        .email(new AppError("INVALID_EMAIL").message)
        .required(new AppError("EMAIL_IS_REQUIRED").message)
        .test(
          "Check-email",
          new AppError("EMAIL_ALREADY_REGISTERED").message,
          async value => {
            if (!value) return false;
            const emailExists = await User.findOne({
              where: { email: value }
            });
            return !emailExists;
          }
        ),
      password: Yup.string()
        .required(new AppError("PASSW_IS_REQUIRED").message)
        .min(6, new AppError("MIN_CARACHTERS_PASSW").message)
        .max(30, new AppError("MAX_CARACHTERS_PASSW").message)
    });

    await schema.validate(req.body);
    return next();
  } catch (error: any) {
    throw new AppError(error.message);
  }
};
