'use strict'

const express = require('express')
const router = express.Router();
const userController = require('./controller/userController')
const postController = require('./controller/postController')

router.post('/user', userController.createUser);
router.post('/authenticateUser',userController.userLogin);
router.get('/user/:userId', userController.getUserById);
router.put('/user/:userId', userController.updateUser);
router.delete('/user/:userId', userController.deleteUser);

router.post('/post', postController.createPost);
router.get('/post/:postId', postController.getPostById);
router.get('/posts/:searchStr', postController.findPosts);
router.put('/post/:postId', postController.updatePost);
router.delete('/post/:title', postController.deletePost);

module.exports = router;