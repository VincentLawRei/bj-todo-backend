const express = require("express");
const authRouter = express.Router();
const AuthController = require("../controllers/AuthController");

const users = [];

authRouter.post("/signup", AuthController.Signup);

authRouter.post("/login", AuthController.Login);

module.exports = { authRouter, users };
