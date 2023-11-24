const CustomErrorAPI = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const authorizationMiddleware = async (req, res, next) => {
  //extracting the header from the request
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new CustomErrorAPI('No Token provided', 401)
  }
  //spliting the header and getting the token
  const token = authHeader.split(' ')[1]

  try {
    //verifying the token with the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    const { id, username } = decoded
    req.user = { id, username }
    next()
  } catch (error) {
    throw new CustomErrorAPI('Not Authorized to access this route!', 401)
  }
}

module.exports = authorizationMiddleware
