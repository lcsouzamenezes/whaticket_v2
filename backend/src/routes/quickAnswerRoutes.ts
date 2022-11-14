import { Router } from "express";

import * as QuickAnswerController from "../controllers/QuickAnswerController";
import isAuth from "../middleware/isAuth";

const quickAnswerRoutes = Router();

quickAnswerRoutes.get("/quickAnswers", isAuth, QuickAnswerController.index);

quickAnswerRoutes.get(
  "/quickAnswers/:quickAnswerId",
  isAuth,
  QuickAnswerController.show
);

quickAnswerRoutes.post("/quickAnswers", isAuth, QuickAnswerController.store);

quickAnswerRoutes.put(
  "/quickAnswers/:quickAnswerId",
  isAuth,
  QuickAnswerController.update
);

quickAnswerRoutes.delete(
  "/quickAnswers/:quickAnswerId",
  isAuth,
  QuickAnswerController.remove
);

export default quickAnswerRoutes;
