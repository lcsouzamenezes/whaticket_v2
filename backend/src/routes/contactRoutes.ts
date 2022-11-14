import { Router } from "express";

import * as ContactController from "../controllers/ContactController";
import * as ImportPhoneContactsController from "../controllers/ImportPhoneContactsController";
import isAuth from "../middleware/isAuth";

const contactRoutes = Router();

contactRoutes.post(
  "/contacts/import",
  isAuth,
  ImportPhoneContactsController.store
);

contactRoutes.get("/contacts", isAuth, ContactController.index);
contactRoutes.get("/contacts/:contactId", isAuth, ContactController.show);
contactRoutes.post("/contacts", isAuth, ContactController.store);
contactRoutes.put("/contacts/:contactId", isAuth, ContactController.update);
contactRoutes.delete("/contacts/:contactId", isAuth, ContactController.remove);

export default contactRoutes;
