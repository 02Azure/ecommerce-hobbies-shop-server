const Cart = require("../models")

async function customerAuthorization(req, res, next) {
	try {
    if(req.user.role === "customer") {
      let cart = await Cart.findByPk(+req.params.id)
      
      if(cart && req.user.id !== task.UserId) throw {name: "Unauthorized"}

      next()
      
    } else { 
      throw {name: "Unauthorized"}
    }
	} 
  
	catch(err) {
    next(err)
	}	
}

module.exports = customerAuthorization