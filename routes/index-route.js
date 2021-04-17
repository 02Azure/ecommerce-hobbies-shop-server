const router = require("express").Router()
const IndexController = require("../controllers/index-controller")
const products = require("./products-route")
const carts = require("./carts-route")
const transactions = require("./transaction-route")

router.post("/login", IndexController.login)
router.post("/register", IndexController.register)
router.use("/carts", carts)
router.use("/products", products)
router.use("/transactions", transactions)

module.exports = router