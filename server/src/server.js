require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

const init = () => {
  const port = 8000
  const mongodb = process.env.DB_CON

  mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })

  app.use(bodyParser.json())
  app.use(bodyParser.raw())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors())
  app.use('/portfolio', require('./Routes/Portfolio/post'))

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
  })
}

init()
