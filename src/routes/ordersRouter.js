import { Router } from "express";
import { getOneOrder, getOrders, postOrders } from "../controllers/ordersController.js";

const ordersRouter = Router();

ordersRouter.post('/order', postOrders)
ordersRouter.get('/orders', getOrders)
ordersRouter.get('/orders/:id', getOneOrder)

export default ordersRouter;