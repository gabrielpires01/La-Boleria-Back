import { Router } from "express";
import { postFlavours } from "../controllers/flavoursController.js";

const flavoursRouter = Router();

flavoursRouter.post('/flavours', postFlavours);

export default flavoursRouter;