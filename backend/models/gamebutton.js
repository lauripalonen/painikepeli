const mongoose = require('mongoose')

const buttonSchema = mongoose.Schema({
  pushCount: Number
})

buttonSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const GameButton = mongoose.model('GameButton', buttonSchema)

module.exports = GameButton