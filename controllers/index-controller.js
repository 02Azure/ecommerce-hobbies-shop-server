class IndexController {
  static async login(req, res, next) {
    try {
      res.status(200).json({success: "login success!"})
    }

    catch(err) {
      next(err)
    }
  }
}

module.exports = IndexController
