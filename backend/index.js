const http= require('http')

let users = [
  {
    id: 1,
    username: 'Charizard',
    password: 'fl4mewheel' 
  },
  {
    id: 2,
    username: 'Kirby',
    password: 'mouthfull'
  },
  {
    id: 3,
    username: 'Cpt. Falcon',
    password: 'yamoves'
  }
]

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json'})
  response.end(JSON.stringify(users))
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)