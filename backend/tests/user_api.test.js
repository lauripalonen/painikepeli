const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
  {
    username: 'aerodactyl',
    passwordHash: 'Wing4ttack',
    points: 20
  },
  {
    username: 'jigglypuff',
    passwordHash: 'p0unD',
    points: 20
  },
  {
    username: 'charizard',
    passwordHash: 'fl4meWheel',
    points: 20
  }
]

beforeEach(async () => {
  await User.deleteMany({})

  let userObject = new User(initialUsers[0])
  userObject.passwordHash = await bcrypt.hash(userObject.passwordHash, 10)
  await userObject.save()

  userObject = new User(initialUsers[1])
  userObject.passwordHash = await bcrypt.hash(userObject.passwordHash, 10)
  await userObject.save()

  userObject = new User(initialUsers[2])
  userObject.passwordHash = await bcrypt.hash(userObject.passwordHash, 10)
  await userObject.save()
})

test('user can login with correct credentials', async () => {

  const credentials = {
    username: 'Aerodactyl',
    password: 'Wing4ttack'
  }

  await api
    .post('/api/login')
    .send(credentials)
    .expect(200)
})

test('user can not login with incorrect password', async () => {
  const credentials = {
    username: 'Jigglypuff',
    password: 'rest'
  }

  await api
    .post('/api/login')
    .send(credentials)
    .expect(401)
})

test('user can not login with non-existing username', async () => {
  const credentials = {
    username: 'Weedle',
    password: ''
  }

  await api
    .post('/api/login')
    .send(credentials)
    .expect(401)
})

test('all users are returned', async () => {
  const response = await api.get('/api/users')
  expect(response.body.length).toBe(initialUsers.length)
})

test('new user can be created with correct credentials', async () => {
  const newUser = {
    username: 'L4pras',
    password: 'Blizz4rd'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)


})

test('correct user is returned', async () => {
  const users = await api.get('/api/users')

  const user = users.body[0]

  const resultUser = await api
    .get(`/api/users/${user.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultUser.body).toEqual(user)

})

test('player points are decremented', async () => {
  const players = await api.get('/api/users')
  const player = players.body[0]
  const buttonPushCount = 1

  // const updatedPlayer = { ...player, points: player.points + 1 }

  const resultPlayer = await api
    .put(`/api/users/${player.id}/points`)
    .send({ user: player, buttonPushCount: buttonPushCount })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultPlayer.body.user.points).toEqual(player.points - 1)

})

afterAll(() => {
  mongoose.connection.close()
})