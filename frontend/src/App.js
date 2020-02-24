import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import userService from './services/user'
import buttonService from './services/button'
import UserForm from './components/UserForm'
import GameDisplay from './components/GameDisplay'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userPoints, setUserPoints] = useState(null)
  const [rewardCounter, setRewardCounter] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedButtonGameUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(user)
      setUserPoints(user.points)
      setNotification('')
      updateRewardCounter()
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      startGameRoutine(user)

    } catch (exception) {
      const errorMessage = exception.response.data.error
      setTimedNotification(errorMessage)
    }
  }

  const handleSignUp = async (event) => {
    event.preventDefault()
    try {
      const user = await userService.signup({
        username, password,
      })

      startGameRoutine(user)

    } catch (exception) {
      const errorMessage = exception.response.data.error
      setTimedNotification(errorMessage)
    }
  }

  const startGameRoutine = (user) => {
    window.localStorage.setItem(
      'loggedButtonGameUser', JSON.stringify(user)
    )

    setUser(user)
    setUserPoints(user.points)

    updateRewardCounter()

    setUsername('')
    setPassword('')
    setNotification('')
  }

  const handleButtonPush = async (event) => {
    const button = await buttonService.getButton()
    let pushCount = button.pushCount

    if (userPoints > 0) {
      pushCount += 1
    }

    const newButton = {
      ...button,
      pushCount: pushCount
    }

    await buttonService.increment(button.id, newButton)
    await handleUserPoints()
    updateRewardCounter()
  }

  const handleUserPoints = async () => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedButtonGameUser'))

    const updatedUser = {
      ...loggedUser,
      points: loggedUser.points < 1 ? 0 : loggedUser.points - 1
    }

    let updatedPoints = updatedUser.points
    setUserPoints(updatedPoints)

    const buttonPushCount = await buttonService.getPushCount()

    if (buttonPushCount % 500 === 0) {
      updatedPoints += 250
      setTimedNotification('250 points rewarded!')
    }

    else if (buttonPushCount % 100 === 0) {
      updatedPoints += 40
      setTimedNotification('40 points rewarded!')
    }

    else if (buttonPushCount % 10 === 0) {
      updatedPoints += 5
      setTimedNotification('5 points rewarded!')
    }

    if (updatedPoints < 1) {
      if (window.confirm("No more points. Start again with 20 points?")) {
        updatedPoints = 20
      } else {
        handleLogout()
        return
      }
    }

    updatedUser.points = updatedPoints
    setUserPoints(updatedUser.points)

    await userService.updateUserPoints(user.id, updatedUser)
    window.localStorage.setItem('loggedButtonGameUser', JSON.stringify(updatedUser))

  }

  const handleLogout = () => {
    setUser(null)
    localStorage.clear()
    setTimedNotification("Thanks for playing!")
  }

  const updateRewardCounter = async () => {
    const pushCount = await buttonService.getPushCount()
    setRewardCounter(10 - (pushCount % 10))
  }

  const setTimedNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const userForm = () => {
    return (
      <UserForm
        handleSubmit={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
        notification={notification}
      />
    )
  }

  const gameDisplay = () => {
    return (
      <GameDisplay
        handleButtonPush={handleButtonPush}
        userPoints={userPoints}
        rewardCounter={rewardCounter}
        notification={notification}
        handleLogout={handleLogout}
      />
    )
  }

  return (
    <div className="main-content">
      <h1>Button <br />the Game</h1>
      <div>
        {user === null ? userForm() : gameDisplay()}
      </div>
    </div>
  )
}

export default App 