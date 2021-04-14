const router = require("express").Router()
const IndexController = require("../controllers/index-controller")
const products = require("./products-route")
const carts = require("./carts-route")
const authentication = require("../middlewares/authentication")

router.post("/login", IndexController.login)
// router.post("/adminlogin", IndexController.adminLogin)
router.post("/register", IndexController.register)

router.use(authentication)

router.use("/carts", carts)
router.use("/products", products)

module.exports = router