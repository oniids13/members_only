const { Router } = require('express');
const { getSecret, postSecret } = require('../controller/secretController');
const secretRouter = Router();


secretRouter.get('/', getSecret);
secretRouter.post('/', postSecret);


module.exports = secretRouter;