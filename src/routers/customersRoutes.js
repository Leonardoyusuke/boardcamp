import { customersGet,customersIdGet,customersPost,customersPut } from "../Controllers/customers.js";
import { Router } from "express";

const customersRouter = Router()

customersRouter.get("/customers",customersGet)
customersRouter.get("/customers",customersIdGet)
customersRouter.post("/customers",customersPost)
customersRouter.put("/customers",customersPut)

export default customersRouter