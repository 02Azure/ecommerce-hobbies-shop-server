const router = require("express").Router()
const ProductController = require("../controllers/product-controller")

router.get("/", ProductController.showAll)


module.exports = router