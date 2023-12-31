require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const mainRouter = require('./routes/main')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const notFound = require('./middlewares/not-found')

//middlewares
app.use(express.json())

app.use('/api/v1', mainRouter)

app.use(express.static('./public'))
app.use(errorHandlerMiddleware)
app.use(notFound)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

start()
