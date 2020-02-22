import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import signupService from './services/signup'
import buttonService from './services/button'
import UserForm from './components/UserForm'
import GameButton from './components/GameButton'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userPoints, setUserPoints] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPainikepeliUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setUserPoints(user.points)
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
      setUserPoints(user.points)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Error: ', exception)
    }
  }

  const handleSignUp = async (event) => {
    event.preventDefault()
    try {
      const user = await signupService.signup({
        username, password,
      })

      setUsername('')
      setPassword('')
      setUser(user)

    } catch (exception) {
      console.log('Error: ', exception)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    localStorage.clear()
    setUser(null)
  }

  const handleButtonPress = async (event) => {
    event.preventDefault()

    const button = await buttonService.getButton()

    const newButton = {
      presses: button.presses + 1
    }

    await buttonService.increment(button.id, newButton)

    console.log(`This was #${newButton.presses} press`)

    await handlePlayerPoints()

  }

  const handlePlayerPoints = async () => {

    const player = await signupService.getPlayer(user.id)

    let updatedPlayer = {...player, points:player.points-1}

    await signupService.updatePlayerPoints(user.id, updatedPlayer)
    setUserPoints(updatedPlayer.points)

    const button = await buttonService.getButton()
    const buttonPresses = button.presses

    if (updatedPlayer.points < 1) {
      console.log('Continue?')
      updatedPlayer.points = 20
      setUserPoints(20)
      await signupService.updatePlayerPoints(user.id, updatedPlayer)
    }

    else if (buttonPresses % 500 === 0) {
      console.log('Reward player with 250 points')
      updatedPlayer.points += 250
      setUserPoints(updatedPlayer.points)
      await signupService.updatePlayerPoints(user.id, updatedPlayer)

    }
    else if (buttonPresses % 100 === 0) {
      console.log('Reward player with 40 points')
      updatedPlayer.points += 40
      setUserPoints(updatedPlayer.points)
      await signupService.updatePlayerPoints(user.id, updatedPlayer)
      
    }
    else if (buttonPresses % 10 === 0) {
      console.log('Reward player with 5 points')
      updatedPlayer.points += 5
      setUserPoints(updatedPlayer.points)
      await signupService.updatePlayerPoints(user.id, updatedPlayer)
    }

  }

  const userForm = () => {
    return (
      <div>
        <div>
          <UserForm
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
        </div>
        <div>
          <button onClick={handleLogin}>Log in</button> or <button onClick={handleSignUp}>Sign up</button>
        </div>
      </div>
    )
  }

  const gameDisplay = () => {
    return (
      <div>
        <div>
          <GameButton handleButtonPress={handleButtonPress} />
        </div>
        <div>
          <button onClick={handleLogout}>Log out</button>
        </div>
        <div>
          Current points: {userPoints}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h1>Painikepeli</h1>
      </div>
      <div>
        {user === null ? userForm() : gameDisplay()}
      </div>
    </div>
  )
}

export default App 