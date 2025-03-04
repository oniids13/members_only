const { Router } = require('express');
const { getMessageForm, postMessage, deleteMessage } = require('../controller/messageController');
const messageRouter = Router();
const { isAuth } = require('./authMiddleware');


messageRouter.get('/', isAuth, getMessageForm);
messageRouter.post('/', postMessage);
messageRouter.get('/:id', deleteMessage);

module.exports = messageRouter;