function errorHandler(err, req, res, next) {
  // console.log(">>>>>>>>>>>", err.name)
  // console.log(err, "<<<<<<<<<<<<<")
  let code = 500
  let message = "Internal Server Error"

  if(err.name === "InvalidUsernameOrPassword") {
    code = 400
    message = "Incorrect Username or Password"
    
  } else if(err.name === "FalsyUsernameOrPassword") {
    code = 400
    message = "Please fill both of the fields"

  } else if(err.name === "SequelizeValidationError") {
    code = 400
    message = err.errors.map(validationError => validationError.message)

  } else if(err.name === "ProductNotFound") {
    code = 404
    message = `Product with id ${req.params.id} is not found` 

  } else if(err.name === "InvalidAccessToken" || err.name === "JsonWebTokenError") {
    code = 401
    message = "Invalid access token"
  
  } else if(err.name === "Unauthorized") {
    code = 401
    message = "You are not authorized for this action"
  }
  

  res.status(code).json({error: message})
}

module.exports = errorHandler;