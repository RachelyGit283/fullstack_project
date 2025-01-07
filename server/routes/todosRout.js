const express = require("express")
const router = express.Router()
const todosController = require("../controllers/todosController")
router.delete("/:id",todosController.deleteTodo)
router.post("/", todosController.createNewTodos)
router.get("/title", todosController.getTodoByComp)
router.get("/", todosController.getAllTodos)
// router.get("/title", todosController.getTodoByComp)
router.put("/:id",todosController.updateTodos)
router.put("/comp/:id",todosController.updateCompTodos)

module.exports = router


