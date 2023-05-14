const express = require("express");
const TodosController = require("../controllers/TodosController");
const passport = require("passport");
const { authenticateToken } = require("../controllers/AuthController");
const router = express.Router();

router.get("/", TodosController.GetTodos);
router.post("/create", TodosController.CreateTodo);
router.post("/update/:id", authenticateToken, TodosController.UpdateTodo);
router.delete("/delete/:id", authenticateToken, TodosController.DeleteTodo);

module.exports = { router };
