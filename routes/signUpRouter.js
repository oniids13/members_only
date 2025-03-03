const signUpController = require('../controller/signUpController');
const { Router } = require('express');

const signUpRouter = Router();

signUpRouter.get('/', signUpController.getForm);
signUpRouter.post('/', signUpController.postForm)



module.exports = signUpRouter;