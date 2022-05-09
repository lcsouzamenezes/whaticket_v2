import { Router } from "express";

import * as WhatsAppController from "../controllers/WhatsAppController";
import isAuth from "../middleware/isAuth";

const whatsappRoutes = Router();

whatsappRoutes.get("/whatsapp/", isAuth, WhatsAppController.index);
whatsappRoutes.post("/whatsapp/", isAuth, WhatsAppController.store);
whatsappRoutes.get("/whatsapp/:whatsappId", isAuth, WhatsAppController.show);
whatsappRoutes.put("/whatsapp/:whatsappId", isAuth, WhatsAppController.update);

whatsappRoutes.delete(
  "/whatsapp/:whatsappId",
  isAuth,
  WhatsAppController.remove
);

export default whatsappRoutes;
