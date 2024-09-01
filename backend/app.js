import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./database/connectDB.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import fileUpload from "express-fileupload";
const app = express();

config({
  path: "./config/config.env",
});
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// for handling tokens
app.use(cookieParser());

// for handling json responses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// upload files
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./temp/",
  })
);

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);

// Connect to MongoDB
connectDB();

// error middleware
app.use(errorMiddleware);

export default app;
