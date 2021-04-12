function errorHandler(err, req, res, next) {
  let code = 500
  let message = "Internal Server Error"

  res.status(code).json({error: message})
}

module.exports = errorHandler;