const express = require("express")
const router = express.Router()
const postsController = require("../controllers/postsController")
router.delete("/:id",postsController.deletePosts)
router.post("/", postsController.createNewPosts)
router.get("/", postsController.getAllPosts)
router.get("/title", postsController.getPostsByt)
router.put("/:id",postsController.updatePosts)


module.exports = router


