import { Request, Response } from "express";

import { ImportContactsService } from "../services";

export const store = async (req: Request, res: Response): Promise<Response> => {
  await ImportContactsService();

  return res.status(200).json({ message: "contacts imported" });
};
