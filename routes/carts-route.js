const router = require("express").Router()
const CartController = require("../controllers/cart-controller")
const customerAuthorization = require("../middlewares/customer-authorization")
const authentication = require("../middlewares/authentication")

router.use(authentication)
router.use(customerAuthorization)

router.get("/", CartController.showAll)
router.post("/", CartController.add)
// router.get("/:id", CartController.showOne)
router.patch("/", CartController.editQuantity)
router.delete("/", CartController.delete)

module.exports = router