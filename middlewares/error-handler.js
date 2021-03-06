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

  } else if(err.name === "SequelizeUniqueConstraintError") {
    code = 400
    message = "This username or email is already registered"

  } else if(err.name === "ProductNotFound") {
    code = 404
    message = `Product with this id is not found` 

  } else if(err.name === "CartNotFound") {
    code = 404
    message = `Cart with this product id is not found` 

  } else if(err.name === "NoProductInCart") {
    code = 400
    message = `Your cart is empty` 

  } else if(err.name === "OutOfStockPurchase") {
    code = 400
    message = err.products
    let message1 = `The following product's stock are less than your cart's quantity, change your cart's quantity accordingly or remove it from your cart` 
    message.unshift(message1)

  } else if(err.name === "TransactionNotFound") {
    code = 404
    message = `Transaction with this id is not found` 

  } else if(err.name === "InvalidQuantity") {
    code = 400
    message = `You can't have a quantity with more than product's stock value` 

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