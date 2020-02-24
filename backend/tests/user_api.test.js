const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
  {
    username: 'Jigglypuff',
    passwordHash: 'p0und'
  },
  {
    username: 'Charizard',
    passwordHash: 'fl4mewheel'
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

afterAll(() => {
  mongoose.connection.close()
})