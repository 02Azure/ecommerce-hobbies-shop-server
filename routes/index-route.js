const router = require("express").Router()
const IndexController = require("../controllers/index-controller")
const products = require("./products-route")

router.post("/login", IndexController.login)
router.post("/adminlogin", IndexController.adminLogin)
router.post("/register", IndexController.register)

router.use("/products", products)

module.exports = router