import { Router } from "express";
import { getClientOrder, postClients } from "../controllers/clientsController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddlesware.js";
import clientValidationSchema from "../schemas/clientValidationSchema.js";

const clientsRouter = Router();

clientsRouter.post('/clients', validateSchemaMiddleware(clientValidationSchema), postClients);
clientsRouter.get('/clients/:id/orders', getClientOrder);

export default clientsRouter;