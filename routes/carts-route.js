const router = require("express").Router()
const CartController = require("../controllers/cart-controller")
const customerAuthorization = require("../middlewares/customer-authorization")

router.get("/", CartController.showAll)
router.post("/", CartController.add)

router.use("/:id", customerAuthorization)

router.get("/:id", CartController.showOne)
router.patch("/:id", CartController.update)
router.delete("/:id", CartController.delete)

module.exports = router