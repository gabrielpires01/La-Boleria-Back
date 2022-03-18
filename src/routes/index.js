import { Router } from "express";
import cakeRouter from "./cakeRouter.js";
import clientsRouter from "./clientsRouter.js";

const router = Router();

router.use(cakeRouter);
router.use(clientsRouter);

export default router;