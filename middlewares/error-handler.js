function errorHandler(err, req, res, next) {
  let code = 500
  let message = "Internal Server Error"

  if(err.name === "InvalidUsernameOrPassword") {
    code = 400
    message = "Incorrect Username or Password"
    
  } else if(err.name === "FalsyUsernameOrPassword") {
    code = 400
    message = "Please fill both of the fields"

  } else if(err.name === "ProductNotFound") {
    code = 404
    message = `Product with id ${req.params.id} is not found` 

  }

  res.status(code).json({error: message})
}

module.exports = errorHandler;