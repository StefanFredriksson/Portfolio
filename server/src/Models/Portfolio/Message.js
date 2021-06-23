const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  subject: {
    required: true,
    type: String
  },
  message: {
    required: true,
    type: String
  }
})

const Message = mongoose.model('Messages', messageSchema)

module.exports = Message
