async function customerAuthorization(req, res, next) {
	try {
    if(req.user.role === "customer") {
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