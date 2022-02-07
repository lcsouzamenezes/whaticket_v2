import { Router } from "express";
import multer from "multer";

import * as MessageController from "../controllers/MessageController";
import uploadConfig from "../config/upload";
import isAuth from "../middleware/isAuth";

const messageRoutes = Router();

const upload = multer(uploadConfig);

messageRoutes.get("/messages/:ticketId", isAuth, MessageController.index);

messageRoutes.post(
  "/messages/:ticketId",
  isAuth,
  upload.array("medias"),
  MessageController.store
);

messageRoutes.delete("/messages/:messageId", isAuth, MessageController.remove);

export default messageRoutes;
