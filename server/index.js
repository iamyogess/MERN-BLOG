import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./configs/connectDB.js";
import {
  errorResponseHandler,
  invalidPathHandler,
} from "./middlewares/errorHandler.js";
import userRoutes from "./routes/userRoute.js";
import postRoutes from "./routes/postRoute.js";
import categoryRoutes from "./routes/postCategoryRoute.js";
import commentRoutes from "./routes/commentRoute.js";
import cookieParser from "cookie-parser";

//.env
dotenv.config();

const app = express();

//connectDB
connectDB();

//middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

//define routes
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

// Define __dirname using ES module approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


//invalid path handlers
app.use(invalidPathHandler);
app.use(errorResponseHandler);

//port
const PORT = process.env.PORT || 5000;

//listening to the server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
