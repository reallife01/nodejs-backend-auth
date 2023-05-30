
const express = require('express')
const handleLogoutToken = require('../controllers/logoutControllers')


const router = express.Router()


router.get('/', handleLogoutToken )

module.exports = router