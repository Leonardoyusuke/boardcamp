import express,{json} from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import gamesRouter from "./routers/gamesRoutes.js";
import customersRouter from "./routers/customersRoutes.js";
import rentalsRouter from "./routers/rentalsRoutes.js";


dotenv.config();

const server = express();
server.use([cors(),json(),gamesRouter,customersRouter,rentalsRouter]);

const port = process.env.PORT || 5001;
server.listen(port, () => console.log(`Server running in port: ${port}`));