const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const verifyUser = require('../utils/verifyUser') // assuming middleware is correctly implemented

router.post('/cars', verifyUser, userController.createCar)
router.get('/cars', verifyUser, userController.listCars)
router.get('/cars/:id', verifyUser, userController.getCar)
router.put('/cars/:id', verifyUser, userController.updateCar)
router.delete('/cars/:id', verifyUser, userController.deleteCar)

module.exports = router
