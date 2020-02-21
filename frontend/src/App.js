import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPainikepeliUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedPainikepeliUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Error: ', exception)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      </div>
    )
  }

  const gameDisplay = () => {
    return (
      <div>
        <button>Painike</button>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h1>Painikepeli</h1>
      </div>
      <div>
        {user === null ? loginForm() : gameDisplay()}
      </div>
    </div>
  )
}

export default App 