const express = require('express');
const { create_send_Message, getMessages, getAllMessages } = require('../controllers/messagesController');

const messageRouter = express.Router();

messageRouter.post('/create_send_Message', create_send_Message);
messageRouter.get('/getMessages/:messageFrom/:messageTo', getMessages);
messageRouter.get('/getAllMessages', getAllMessages);

module.exports = messageRouter;