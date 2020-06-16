exports.rewardCalculator = (buttonPushCount) => {
  let reward = 0;

  if (buttonPushCount % 500 === 0) {
    reward = 250
  }

  else if (buttonPushCount % 100 === 0) {
    reward = 40
  }

  else if (buttonPushCount % 10 === 0) {
    reward = 5
  }

  return reward
}