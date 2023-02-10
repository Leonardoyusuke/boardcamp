import { rentalsGet, rentalsPost,rentalsEndPost,rentalsDelete } from "../Controllers/rentals.js";
import { Router } from "express";

const rentalsRouter = Router()

rentalsRouter.get("/rentals",rentalsGet)
rentalsRouter.post("/rentals",rentalsPost)
rentalsRouter.post("/rentals",rentalsEndPost)
rentalsRouter.delete("/rentals",rentalsDelete)

export default rentalsRouter