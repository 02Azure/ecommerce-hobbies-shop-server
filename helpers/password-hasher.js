const bcrypt = require("bcrypt")

function hashPassword(input) {
  return bcrypt.hashSync(input, 8)
}

module.exports = hashPassword