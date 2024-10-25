import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./configs/connectDB.js";
import {
  errorResponseHandler,
  invalidPathHandler,
} from "./middlewares/errorHandler.js";

//.env
dotenv.config();

const app = express();

//connectDB
connectDB();

//middlewares
app.use(express.json());
app.use(cors());

//invalid path handlers
app.use(invalidPathHandler);
app.use(errorResponseHandler);

//port
const PORT = process.env.PORT;

//listening to the server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
