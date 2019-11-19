const jwt = require('jsonwebtoken')


// jwt token 获取
const generateToken = function (uid, scope) {

  const secretKey = global.config.security.secretKey
  const expiresIn = global.config.security.expiresIn
  const token = jwt.sign({
    uid,
  }, secretKey, {
    expiresIn
  })

  return token
}


module.exports = {
  generateToken
}
