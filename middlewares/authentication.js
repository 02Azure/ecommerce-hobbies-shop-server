const jwt = require("jsonwebtoken")
const {User} = require("../models")

async function authentication(req, res, next) {
	try {
		let result = jwt.verify(req.headers.access_token, process.env.SECRET_CODE || "secret")
		let loggedUser = await User.findOne({
			where: {
				username: result.username
			}
		})

		if(loggedUser) {
			req.user = {
				id: result.id,
				username: result.username,
        role: loggedUser.role
			} 
			
			next() 
			
		} else {
			throw {name: "InvalidAccessToken"}
		}
	} 

	catch(err) {
		next(err)
	}
}

module.exports = authentication