import React from 'react'
import GameButton from './GameButton'

const GameDisplay = ({
  handleButtonPush,
  userPoints,
  rewardCounter,
  notification,
  handleLogout
}) => {
  return (
    <div>
      <div className="game-content">
        <GameButton handleButtonPush={handleButtonPush} />
      </div>
      <div className="game-data">
        Your points: {userPoints} <br />
        Next reward in: {rewardCounter} pushes
      </div>
      <div className="notification-bar">
        {notification}
      </div>
      <div className="instruction-block">
        <h4>Instructions: </h4>
        <p className="instructions">
          * Push the button and gain rewards<br />
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

export default GameDisplay