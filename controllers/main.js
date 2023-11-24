const CustomErrorAPI = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new CustomErrorAPI('Please provide email or password', 400)
  }
  const id = new Date().getDate()
  //Signing a JWT token with secrey key
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
  res.status(200).json({ msg: 'User Created', token })
}

const dashboard = async (req, res) => {
  console.log(req.user)
  const luckyNumber = Math.floor(Math.random() * 101)
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your data, your lucky number is ${luckyNumber}`
  })
}

module.exports = {
  login,
  dashboard
}
