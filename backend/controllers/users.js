const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      passwordHash,
      points: 20
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/:id', async (request, response) => {
  const player = await User.findById(request.params.id)
  response.json(player)
})

usersRouter.put('/:id', async (request, response) => {
  const player = request.body
  User.findByIdAndUpdate(request.params.id, player, { new: true })
    .then(updatedPlayer => {
      response.json(updatedPlayer.toJSON())
    })
    .catch(error => next(error))
})

module.exports = usersRouter