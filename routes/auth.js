const express = require('express')
const handleLogin = require('../controllers/authContoller')

const router = express.Router()

router.post('/', handleLogin)

module.exports = router

