const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const GameButton = require('../models/gamebutton')

const api = supertest(app)

const initialButtons = [
  {
    presses: 50
  }
]

beforeEach(async () => {
  await GameButton.deleteMany({})

  const buttonObject = new GameButton(initialButtons[0])
  await buttonObject.save()
})

test('a button is returned', async () => {
  const gameButton = await api.get('/api/button')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(gameButton.body.presses).toEqual(50)

})

test('button pushes can be incremented', async () => {
  const result = await api.get('/api/button')
  const gameButton = result.body
  const incrementedButton = { ...gameButton, presses: gameButton.presses + 1 }

  const response = await api
    .put(`/api/button/${gameButton.id}`)
    .send(incrementedButton)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.presses).toEqual(gameButton.presses + 1)

})


afterAll(() => {
  mongoose.connection.close()
})

