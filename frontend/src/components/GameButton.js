import React from 'react'

const GameButton = ({ handleButtonPush}) => {
  return (
  <div>
    <button onClick={handleButtonPush} id="thebutton">PUSH</button>
  </div>
  )
}

export default GameButton