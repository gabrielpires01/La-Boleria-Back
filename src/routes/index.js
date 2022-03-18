import { Router } from "express";
import cakeRouter from "./cakeRoute.js";

const router = Router();

router.use(cakeRouter);

export default router;