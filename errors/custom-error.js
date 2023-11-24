class CustomErrorAPI extends Error {
  constructor (message, status) {
    super(message)
  }
}

module.exports = CustomErrorAPI
