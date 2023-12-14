const express = require("express");
const router = express.Router();
const todosController = require("../controller/todosController");

router.post("/add/todo", todosController.addTodo);
router.get("/find/todo/:user_id", todosController.findTodo);
router.post("/delete/todo", todosController.deleteTodo);
router.post("/update/completed", todosController.updateCompleted);
router.post("/filter/todos", todosController.filterTodos);

module.exports = router;
