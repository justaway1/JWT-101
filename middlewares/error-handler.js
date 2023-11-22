const CustomErrorAPI = require('../errors/custom-error')

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomErrorAPI) {
    return res.status(err.status).json({ msg: err.message })
  }
  return res.status(500).send('Something went wrong, try again later.')
}

module.exports = errorHandlerMiddleware
