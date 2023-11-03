const express = require("express");
const router = express.Router();

//controller form user
const userController = require("../controller/User");

//routes
router.post("/create", userController.userSignUp);
router.post("/login", userController.login);
router.post("/forget", userController.forgotPassword);
router.get("/user", userController.getUser);
router.delete("/user/:id", userController.deleteUserById);
router.put("/reset/:id", userController.resetLink);

module.exports = router;
