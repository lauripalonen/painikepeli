const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
.then(() => {
  console.log('Connected to MongoDB')
})
.catch((error) => {
  console.log('Error connecting to MongDB: ', error.message)
})

app.use(cors())
app.use(bodyParser.json())

const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('---')
  next()
}

app.use('/api/users', usersRouter)

app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

module.exports = app