async function adminAuthorization(req, res, next) {
	try {
    if(req.user.role === "admin") {
      next()

    } else { 
      throw {name: "Unauthorized"}
    }
	} 
  
	catch(err) {
    next(err)
	}	
}

module.exports = adminAuthorization