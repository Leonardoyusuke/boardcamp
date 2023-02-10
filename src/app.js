import express,{json} from "express";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

const server = express();
server.use([cors(),json(),gamesRouter,customersRouter,rentalsRouter]);

const port = process.env.PORT || 5001;
server.listen(port, () => console.log(`Server running in port: ${port}`));