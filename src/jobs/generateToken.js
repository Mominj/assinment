const jwt = require('jsonwebtoken')
const config = require('../config/config')
const maxaage = 3*24*60*60

const createToken = (email,role_id)=> {
  return jwt.sign({email,role_id}, config.jwt.accessTokenSecret, {
    expiresIn: maxaage
  });
}

module.exports = createToken