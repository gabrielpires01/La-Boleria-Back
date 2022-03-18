import { Router } from "express";
import cakeRouter from "./cakeRouter.js";
import clientsRouter from "./clientsRouter.js";
import flavoursRouter from "./flavoursRouter.js";
import ordersRouter from "./ordersRouter.js";

const router = Router();

router.use(cakeRouter);
router.use(clientsRouter);
router.use(ordersRouter);
router.use(flavoursRouter);

export default router;