import React from 'react'

const GameButton = ({ handleButtonPress}) => {
  return (
  <div>
    <button onClick={handleButtonPress}>The Button</button>
  </div>
  )
}

export default GameButton