const Message = require('../../Models/Portfolio/Message')

const saveMessage = (req, res) => {
  const { name, email, subject, message } = req.body

  const msg = new Message({
    name,
    email,
    subject,
    message
  })
  msg.save()
  res.json({ message: 'OK!' })
}

module.exports = {
  saveMessage
}
