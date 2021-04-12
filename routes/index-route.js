const router = require("express").Router()
const IndexController = require("../controllers/index-controller")
const products = require("./products-route")

router.post("/login", IndexController.login)

router.use("/products", products)

module.exports = router