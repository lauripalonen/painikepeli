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
    setNotification('loading...')
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
    setNotification('loading...')
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

  const handleGameButtonPush = async (event) => {
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

    setUserPoints(loggedUser.points < 1 ? 0 : loggedUser.points - 1)

    const buttonPushCount = await buttonService.getPushCount()

    const response = await userService.incrementUserPoints(user.id,
      { user: loggedUser, buttonPushCount: buttonPushCount })

    let updatedUser = response.user
    const reward = response.reward

    if (reward > 0) {
      setTimedNotification(`${reward} points rewarded!`)
    }

    if (updatedUser.points < 1) {
      if (window.confirm("No more points. Start again with 20 points?")) {
        updatedUser = await userService.resetUserPoints(user.id, loggedUser)
      } else {
        handleLogout()
        return
      }
    }
    
    setUserPoints(updatedUser.points)
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
        handleButtonPush={handleGameButtonPush}
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