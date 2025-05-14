const express = require('express');
const router = express.Router();
const userController = require('./userController');
const messageController = require('./messageController');

router.get('/user/', userController.handleUserAuth);
router.post('/createMessage', messageController.createMessage);
router.get('/getMessages', messageController.getMessages);
router.put('/updateMessage/:messageId', messageController.updateMessage);
router.delete('/deleteMessage/:messageId', messageController.deleteMessage);

module.exports = router;