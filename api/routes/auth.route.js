const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const verifyUser = require('../utils/verifyUser')

// Register a new user
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/me', verifyUser, authController.authCheck)
module.exports = router
