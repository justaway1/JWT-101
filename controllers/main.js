const CustomErrorAPI = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new CustomErrorAPI('Please provide email or password', 400)
  }
  const id = new Date().getDate()

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
  res.status(200).json({ msg: 'User Created', token })
}

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new CustomErrorAPI('No Token provided', 401)
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const luckyNumber = Math.floor(Math.random() * 101)
    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your data, your lucky number is ${luckyNumber}`
    })
    console.log(decoded)
  } catch (error) {
    throw new CustomErrorAPI('Not Authorized to access this route!', 401)
  }
}

module.exports = {
  login,
  dashboard
}
