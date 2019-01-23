'use strict'

const express = require('express')
const router = express.Router();
const userController = require('./controller/userController')

router.post('/user', userController.createUser);
router.post('/authenticateUser',userController.userLogin);
router.get('/user/:userId', userController.getUserById);
router.put('/user/:userId', userController.updateUser);
router.delete('/user/:userId', userController.deleteUser);

module.exports = router;