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
  const [notification, setNotification] = useState('')

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

      window.localStorage.setItem(
        'loggedPainikepeliUser', JSON.stringify(user)
      )

      setUser(user)
      setUserPoints(user.points)

      updateRewardCounter()

      setUsername('')
      setPassword('')

    } catch (exception) {
      const errorMessage = exception.response.data.error
      setTimedNotification(errorMessage)
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
    const updatedPlayer = {
      ...storedPlayer,
      points: storedPlayer.points < 1 ? 0 : storedPlayer.points - 1
    }
    let updatedPoints = updatedPlayer.points
    setUserPoints(updatedPoints)

    const buttonPresses = await buttonService.getButtonPresses()

    if (updatedPlayer.points < 1) {
      if (window.confirm("No more points. Start again with 20 points?")) {
        updatedPoints = 20
        setUserPoints(20)
      } else {
        localStorage.clear()
        setUser(null)
      }
    }

    else if (buttonPresses % 500 === 0) {
      updatedPoints += 250
      setUserPoints(updatedPlayer.points)
      setTimedNotification('250 points rewarded!')
    }

    else if (buttonPresses % 100 === 0) {
      updatedPoints += 40
      setUserPoints(updatedPlayer.points)
      setTimedNotification('40 points rewarded!')
    }

    else if (buttonPresses % 10 === 0) {
      updatedPoints += 5
      setUserPoints(updatedPlayer.points)
      setTimedNotification('5 points rewarded!')
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
      <div className="account-form">
        <div>
          <UserForm
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
            className="user-form"
          />
        </div>
        <div className="button-block">
          <button onClick={handleLogin} className="normal-button">LOG IN</button> or <button onClick={handleSignUp} className="normal-button">SIGN UP</button>
        </div>
        <p style={{ textAlign: 'center' }}>{notification}</p>
      </div>
    )
  }

  const gameDisplay = () => {
    return (
      <div>
        <div className="game-content">
          <GameButton handleButtonPress={handleButtonPress} />
        </div>
        <div className="game-data">
          Your points: {userPoints} < br />
          Next reward in: {rewardCounter} pushes
        </div>
        <div className="notification-bar">
          {notification}
        </div>
        <div className="instruction-block">
          <h4>Instructions: </h4>
          <p className="instructions">
            * Push the button and gain rewards<br/>
            * Push cost: 1 point <br />
            * Lose all points: Game over!<br /><br />
            You can start again with 20 points <br />
          </p>
          <h4>Rewards: </h4>
          <p className="instructions">
            * every 10th click: +5 points <br />
            * every 100th click: +40 points <br />
            * every 500th click: +250 points <br />
          </p>
          <p className="quote">"You win some, you lose some!"</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={handleLogout} className="normal-button">LOG OUT</button>
        </div>
      </div>
    )
  }

  const setTimedNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  return (
    <div className="main-content">
      <div>
        <h1>Button <br/>the Game</h1>
      </div>
      <div>
        {user === null ? userForm() : gameDisplay()}
      </div>
    </div>
  )
}

export default App 