const { Unauthorized } = require('../errors')
const jwt = require('jsonwebtoken')

const authorizationMiddleware = async (req, res, next) => {
  //extracting the header from the request
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new Unauthorized('No Token provided')
  }
  //spliting the heade.UNAUTHORIZEDr and getting the token
  const token = authHeader.split(' ')[1]

  try {
    //verifying the token with the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    //Extracting the id and username from the decoded token
    const { id, username } = decoded
    //storing the id and username in the request object
    req.user = { id, username }
    next()
  } catch (error) {
    throw new Unauthorized('Not Authorized to access this route!')
  }
}

module.exports = authorizationMiddleware
