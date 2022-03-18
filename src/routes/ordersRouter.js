import { Router } from "express";
import { postOrders } from "../controllers/ordersController.js";

const ordersRouter = Router();

ordersRouter.post('/order', postOrders)

export default ordersRouter;