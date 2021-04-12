const router = require("express").Router()
const ProductController = require("../controllers/product-controller")

router.get("/", ProductController.showAll)
router.post("/", ProductController.add)
router.get("/:id", ProductController.showOne)
router.put("/:id", ProductController.update)
router.delete("/:id", ProductController.delete)

module.exports = router