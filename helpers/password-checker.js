const bcrypt = require("bcrypt")

function checkPassword(input, hashed) {
  return bcrypt.compareSync(input, hashed)
}

module.exports = checkPassword