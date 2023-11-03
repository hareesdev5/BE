// import express from "express";
const express = require("express");
const app = express();
// import cors from "cors";
const cors = require("cors");

// import dotenv from "dotenv";
const dotenv = require("dotenv");
dotenv.config();

//server listening port
const PORT = process.env.PORT;

// import appRouter from "./routes/index.js";
const appRouter = require("./routes/index");

app.use(cors());

app.use(express.json());
app.use("/", appRouter);

app.listen(PORT, () => console.log(`Server listening Port ${PORT}`));
