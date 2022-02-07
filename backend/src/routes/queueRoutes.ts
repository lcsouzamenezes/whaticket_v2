import { Router } from "express";

import * as QueueController from "../controllers/QueueController";
import isAuth from "../middleware/isAuth";

const queueRoutes = Router();

queueRoutes.get("/queue", isAuth, QueueController.index);

queueRoutes.post("/queue", isAuth, QueueController.store);

queueRoutes.get("/queue/:queueId", isAuth, QueueController.show);

queueRoutes.put("/queue/:queueId", isAuth, QueueController.update);

queueRoutes.delete("/queue/:queueId", isAuth, QueueController.remove);

export default queueRoutes;
