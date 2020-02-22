const GameButton = require('../models/gamebutton')
const buttonRouter = require('express').Router()

buttonRouter.get('/', async (request, response) => {
  const gamebutton = await GameButton.findOne({})
  response.json(gamebutton)
})

buttonRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    const newButton = new GameButton({presses: body.presses})
    const savedButton = await newButton.save()

    response.json(savedButton)
  } catch (exception) {
    next(exception)
  }
})

buttonRouter.put('/:id', (request, response, next) => {

  const body = request.body

  const gamebutton = {
    presses: body.presses
  }

  GameButton.findByIdAndUpdate(request.params.id, gamebutton, { new: true })
  .then(updatedButton => {
    response.json(updatedButton.toJSON())
  })
  .catch(error => next(error))

})

module.exports = buttonRouter