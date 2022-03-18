import { Router } from "express";
import { getOrders, postOrders } from "../controllers/ordersController.js";

const ordersRouter = Router();

ordersRouter.post('/order', postOrders)
ordersRouter.get('/orders', getOrders)

export default ordersRouter;