import { Router } from "express";
import { getOneOrder, getOrders, patchDeliveredOrder, postOrders } from "../controllers/ordersController.js";

const ordersRouter = Router();

ordersRouter.post('/order', postOrders)
ordersRouter.get('/orders', getOrders)
ordersRouter.get('/orders/:id', getOneOrder)
ordersRouter.patch('/order/:id', patchDeliveredOrder)

export default ordersRouter;