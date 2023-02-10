import { customersGet,customersIdGet,customersPost,customersPut } from "../Controllers/customers.js";
import { Router } from "express";
import { validationSchema } from "../middleware/customersMiddleware.js";

const customersRouter = Router()

customersRouter.get("/customers",customersGet)
customersRouter.get("/customers/:id",customersIdGet)
customersRouter.post("/customers",validationSchema ,customersPost)
customersRouter.put("/customers/:id",customersPut)

export default customersRouter