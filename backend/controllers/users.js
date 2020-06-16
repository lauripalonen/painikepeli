const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { rewardCalculator } = require('../tools/computationalTools')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const passwordValidator = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{5,})")
    if (!passwordValidator.test(body.password)) {
      return response.status(400).send({ error: 'password too weak: please include lowercase, uppercase and numeric characters (min. length: 5)' })
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
  const user = await User.findById(request.params.id)
  response.json(user)
})

usersRouter.put('/:id/points', (request, response) => {
  const user = request.body.user
  const buttonPushCount = request.body.buttonPushCount

  const reward = rewardCalculator(buttonPushCount)

  let points = user.points - 1 + reward
  const updatedUser = { ...user, points: points }

  User.findByIdAndUpdate(request.params.id, updatedUser, { new: true })
    .then(updatedUser => {
      response.json({ user: updatedUser.toJSON(), reward: reward })
    })
    .catch(error => next(error))
})

usersRouter.put('/:id/reset', async (request, response) => {
  const user = request.body.user
  const updatedUser = { ...user, points: 20 }
  const resp = await User.findByIdAndUpdate(request.params.id, updatedUser, { new: true })
  response.json(resp.toJSON())
})

module.exports = usersRouter