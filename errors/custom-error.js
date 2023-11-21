class CustomErrorAPI extends Error {
  constructor (message, status) {
    super(status)
    this.status = status
  }
}

module.exports = CustomErrorAPI
