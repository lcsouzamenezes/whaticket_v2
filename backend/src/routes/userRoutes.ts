import { Router } from "express";

import * as UserController from "../controllers/UserController";
import userValidator from "../validations/schemas/userValidator";
import isAuth from "../middleware/isAuth";

const userRoutes = Router();

userRoutes.get("/users", isAuth, UserController.index);

userRoutes.get("/users/:userId", isAuth, UserController.show);

userRoutes.post("/users", isAuth, userValidator, UserController.store);

userRoutes.put("/users/:userId", isAuth, userValidator, UserController.update);

userRoutes.delete("/users/:userId", isAuth, UserController.remove);

export default userRoutes;
