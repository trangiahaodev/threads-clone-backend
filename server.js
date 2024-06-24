import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";

dotenv.config();

// Connect to database
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(5000, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
