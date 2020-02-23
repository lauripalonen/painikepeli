const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('--------------------')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  else if (error.name === 'ValidationError') {
    if (error.message.includes("unique")) {
      return response.status(400).json({ error: 'username already exists' })
    } else if (error.message.includes("allowed length")) {
      return response.status(400).json({ error: 'please use a username between 5-12 characters' })
    } else {
      return response.status(400).json({ error: error.message })
    }
  }

  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}