const express = require("express")
const router = express.Router()
const photoController = require("../controllers/photoController")
router.delete("/",photoController.deletePhoto)
router.post("/p:imageUrl", photoController.createNewPhoto)
router.get("/", photoController.getUserByImageUrl)
// router.get("/:title", photoController.getPostsByComp)
router.put("/",photoController.updatePhoto)
module.exports = router









       

