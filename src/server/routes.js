const express = require('express');
const router = express.Router();
const userController = require('./userController');
const messageController = require('./messageController');

router.post('/user/', userController.handleUserAuth);
router.post('/createMessage', messageController.createMessage);
router.get('/getMessages', messageController.getMessages);
router.put('/updateMessage/:messageId', messageController.updateMessage);
router.delete('/deleteMessage/:messageId', messageController.deleteMessage);
router.put('/updateUserRole', userController.updateUserRole);

module.exports = router;
