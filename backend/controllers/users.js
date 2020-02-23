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

    const passwordValidator = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{5,})")
    if(!passwordValidator.test(body.password)){
    return response.status(400).send({error: 'password too weak: please include lowercase, uppercase and numeric characters (min. length: 5)'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username.toLowerCase(),
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