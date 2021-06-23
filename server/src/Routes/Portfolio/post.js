const router = require('express').Router()
const { saveMessage } = require('../../Controllers/Portfolio/postController')

router.post('/message', saveMessage)

module.exports = router
