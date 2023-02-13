import { rentalsGet, rentalsPost,rentalsEndPost,rentalsDelete } from "../Controllers/rentals.js";
import { Router } from "express";
import { validationSchemaRental } from "../middleware/rentalsMiddleware.js";

const rentalsRouter = Router()

rentalsRouter.get("/rentals",rentalsGet)
rentalsRouter.post("/rentals",validationSchemaRental,rentalsPost)
rentalsRouter.post("/rentals/:id/return",rentalsEndPost)
rentalsRouter.delete("/rentals/:id",rentalsDelete)

export default rentalsRouter