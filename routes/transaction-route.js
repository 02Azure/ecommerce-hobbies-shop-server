const router = require("express").Router()
const TransController = require("../controllers/transaction-controller")
const authentication = require("../middlewares/authentication")
const spCustomerAuthorization = require ("../middlewares/sp-customer-authorization")

router.use(authentication)

router.get("/", TransController.showAll) 
router.post("/", TransController.add)
router.use("/:id", spCustomerAuthorization)
router.get("/:id", TransController.showOne)

module.exports = router