require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

const init = () => {
  const port = process.env.PORT || 8080
  const mongodb = process.env.DB_CON

  mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })

  app.use(express.static('public'))
  app.use(bodyParser.json())
  app.use(bodyParser.raw())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors())
  app.use('/api/portfolio', require('./src/Routes/Portfolio/post'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
  })
}

init()
