const express = require("express")
const router = express.Router()
const usersController = require("../controllers/usersController")
router.get("/email",usersController.getUserByEmail)
router.get("/filter/:obj",usersController.getFilterUsers)
router.get("/",usersController.getAllUsers)
router.get("/:id", usersController.getUserById)
router.post("/", usersController.createNewUsers)
router.delete("/:id",usersController.deleteUser)
router.put("/:id",usersController.updateUser)
//chack
// router.get("/email",usersController.getUserByEmail)
module.exports = router