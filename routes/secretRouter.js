const { Router } = require('express');
const { getSecret, postSecret } = require('../controller/secretController');
const secretRouter = Router();
const { isAuth } = require('./authMiddleware');

secretRouter.get('/', isAuth, getSecret);
secretRouter.post('/', postSecret);


module.exports = secretRouter;