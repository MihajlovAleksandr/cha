const express = require('express');
const router = express.Router();
const userController = require('./userController');
const messageController = require('./messageController');

router.post('/users', userController.createUser);
router.get('/user/:username/:password', userController.getUser);
router.post('/messages', messageController.createMessage);
router.get('/getMessages', messageController.getMessages);
router.get('/messages/:userId', messageController.getMessagesByUser);

module.exports = router;
