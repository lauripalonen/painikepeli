import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import userService from './services/user'
import buttonService from './services/button'
import UserForm from './components/UserForm'
import GameButton from './components/GameButton'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userPoints, setUserPoints] = useState(null)
  const [rewardCounter, setRewardCounter] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPainikepeliUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(user)
      setUserPoints(user.points)
      updateRewardCounter()
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

      updateRewardCounter()

      setUsername('')
      setPassword('')

    } catch (exception) {
      console.log('Error: ', exception)
    }
  }

  const handleSignUp = async (event) => {
    event.preventDefault()
    try {
      const user = await userService.signup({
        username, password,
      })

      window.localStorage.setItem(
        'loggedPainikepeliUser', JSON.stringify(user)
      )

      setUser(user)
      setUserPoints(user.points)

      updateRewardCounter()

      setUsername('')
      setPassword('')

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

    await handlePlayerPoints()

    updateRewardCounter()

  }

  const handlePlayerPoints = async () => {

    const storedPlayer = JSON.parse(window.localStorage.getItem('loggedPainikepeliUser'))
    const updatedPlayer = { ...storedPlayer, points: storedPlayer.points - 1 }
    let updatedPoints = updatedPlayer.points

    const buttonPresses = await buttonService.getButtonPresses()

    if (updatedPlayer.points < 1) {
      console.log('Continue?')
      updatedPoints = 20
      setUserPoints(20)
    }
    
    else if (buttonPresses % 500 === 0) {
      console.log('Reward player with 250 points')
      updatedPoints += 250
      setUserPoints(updatedPlayer.points)
    }

    else if (buttonPresses % 100 === 0) {
      console.log('Reward player with 40 points')
      updatedPoints += 40
      setUserPoints(updatedPlayer.points)
    }
    
    else if (buttonPresses % 10 === 0) {
      console.log('Reward player with 5 points')
      updatedPoints += 5
      setUserPoints(updatedPlayer.points)
    }

    updatedPlayer.points = updatedPoints
    setUserPoints(updatedPlayer.points)

    await userService.updatePlayerPoints(user.id, updatedPlayer)
    window.localStorage.setItem('loggedPainikepeliUser', JSON.stringify(updatedPlayer))

  }

  const updateRewardCounter = async () => {
    const buttonPresses = await buttonService.getButtonPresses()
    setRewardCounter(10 - (buttonPresses % 10))
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
          Current points: {userPoints} < br />
          Clicks until next reward: {rewardCounter}
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