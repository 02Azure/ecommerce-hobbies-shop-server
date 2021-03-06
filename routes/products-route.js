const router = require("express").Router()
const ProductController = require("../controllers/product-controller")
const adminAuthorization = require("../middlewares/admin-authorization")
const authentication = require("../middlewares/authentication")

router.get("/", ProductController.showAll)
router.get("/:id", ProductController.showOne)

router.use(authentication)
router.use(adminAuthorization)

router.post("/", ProductController.add)
router.put("/:id", ProductController.update)
router.delete("/:id", ProductController.delete)

module.exports = router