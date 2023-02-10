import { gamesGet,gamesPost } from "../Controllers/games.js";
import { Router } from "express";

const gamesRouter = Router()

gamesRouter.get("/games",gamesGet)
gamesRouter.post("/games",gamesPost)

export default gamesRouter