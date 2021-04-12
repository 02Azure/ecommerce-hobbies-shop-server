const {User} = require("../models")
const jwt = require("jsonwebtoken")
const checkPassword = require("../helpers/password-checker")

class IndexController {
  static async login(req, res, next) {
    let input = {
      username: req.body.username,
      password: req.body.password
    }

    if(!input.username || !input.password) throw {name: "FalsyUsernameOrPassword"}

    try {
			let user = await User.findOne({
				where: {
					username: input.username
				}
			})
			
			if(user && checkPassword(input.password, user.password)) {
				let token = jwt.sign({id: user.id, username: user.username}, process.env.SECRET_CODE || "secret")
				
				res.status(200).json({username: input.username, access_token: token})
				
			} else {
				throw {name: "InvalidUsernameOrPassword"}
			}
    }

    catch(err) {
      next(err)
    }
  }

  static async register(req, res, next) {
    let input = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }

    try {
      let newUser = await User.create(input)

      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      })
    }

    catch(err) {
      next(err)
    }
  }
}

module.exports = IndexController
