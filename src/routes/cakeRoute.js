import { Router } from "express";
import { cakeValidation } from "../schemas/cakeValidationSchema.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddlesware.js";
import { postCakes } from "../controllers/cakesController.js";

const cakeRouter = Router();

cakeRouter.post('/cakes', validateSchemaMiddleware(cakeValidation), postCakes)

export default cakeRouter;