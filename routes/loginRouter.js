const { Router } = require('express');
const { getLogin, loginAuth, loginSuccess } = require('../controller/loginController');
const loginRouter = Router();



loginRouter.get('/', getLogin);
loginRouter.post('/', loginAuth);

loginRouter.get('/success', loginSuccess);


module.exports = loginRouter;