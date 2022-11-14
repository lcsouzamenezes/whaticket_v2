import { Router } from "express";

import * as TicketController from "../controllers/TicketController";
import isAuth from "../middleware/isAuth";

const ticketRoutes = Router();

ticketRoutes.get("/tickets", isAuth, TicketController.index);
ticketRoutes.get("/tickets/:ticketId", isAuth, TicketController.show);
ticketRoutes.post("/tickets", isAuth, TicketController.store);
ticketRoutes.put("/tickets/:ticketId", isAuth, TicketController.update);
ticketRoutes.delete("/tickets/:ticketId", isAuth, TicketController.remove);

export default ticketRoutes;
