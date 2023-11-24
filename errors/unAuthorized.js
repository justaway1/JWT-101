const CustomErrorAPI = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

class Unauthorized extends CustomErrorAPI {
  constructor (message) {
    super(message)
    this.status = StatusCodes.UNAUTHORIZED
  }
}

module.exports = Unauthorized
