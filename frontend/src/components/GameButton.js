import React from 'react'

const GameButton = ({ handleButtonPress}) => {
  return (
  <div>
    <button onClick={handleButtonPress} id="thebutton">PUSH</button>
  </div>
  )
}

export default GameButton