// import express from "express"
const express = require("express");
const router = express.Router();

// import userRouter from './User.js'
const userRouter = require("./User.js");
router.use("/", userRouter);

// export default router;
module.exports = router;
