class ProductController {
  static async showAll(req, res, next) {
    try {
      res.status(200).json({success: "Show All Products success!"})
    }

    catch(err) {
      next(err)
    }
  }
}

module.exports = ProductController
