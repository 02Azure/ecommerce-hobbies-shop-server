const {Transaction} = require("../models")

async function spCustomerAuthorization(req, res, next) {
	try {
    let transaction = await Transaction.findByPk(+req.params.id)

    if(!transaction) throw {name: "TransactionNotFound"}

    if(+req.user.id === transaction.UserId) {
      next()
      
    } else { 
      throw {name: "Unauthorized"}
    }
	} 
  
	catch(err) {
    next(err)
	}	
}

module.exports = spCustomerAuthorization