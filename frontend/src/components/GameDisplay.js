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
    <div className="game-display">
      <div className="game-content">
        <GameButton handleButtonPush={handleButtonPush} />
      </div>
      <div className="game-data">
        Your points: {userPoints} <br />
        Next reward in: {rewardCounter} pushes
      </div>
      <div className="game-notification-bar">
        {notification}
      </div>
      <div className="instruction-block">
        <h4>Instructions: </h4>
        <ul>
          <li>* Push the button and gain rewards</li>
          <li>* Push cost: 1 point</li>
          <li>* Lose all points: Game over!</li>
          <br/>
          <li>(You can start again with 20 points)</li>
        </ul>
        <h4>Rewards: </h4>
        <ul>
          <li>* every 10th click: +5 points</li>
          <li>* every 100th click: +40 points</li>
          <li>* every 500th click: +250 points</li>
        </ul>
        <p className="quote">"You win some, you lose some!"</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <button onClick={handleLogout} className="normal-button">LOG OUT</button>
      </div>
    </div>
  )
}

export default GameDisplay