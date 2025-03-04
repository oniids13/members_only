const { Router } = require('express');
const { getLogin, loginAuth, loginFail, loginSuccess } = require('../controller/loginController');
const loginRouter = Router();



loginRouter.get('/', getLogin);
loginRouter.post('/', loginAuth);
loginRouter.get('/failure', loginFail);
loginRouter.get('/success', loginSuccess);


module.exports = loginRouter;