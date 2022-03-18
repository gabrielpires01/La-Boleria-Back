import { Router } from "express";
import cakeRouter from "./cakeRouter.js";
import clientsRouter from "./clientsRouter.js";
import ordersRouter from "./ordersRouter.js";

const router = Router();

router.use(cakeRouter);
router.use(clientsRouter);
router.use(ordersRouter);

export default router;