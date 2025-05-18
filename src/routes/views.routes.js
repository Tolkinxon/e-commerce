const express = require('express');
const viewsController = require('../controllers/views.controller');

const viewsRouter = express.Router();

viewsRouter.get('/', viewsController.MAIN);
viewsRouter.get('/register', viewsController.REGISTER_PAGE);
viewsRouter.get('/login', viewsController.LOGIN_PAGE);

module.exports = viewsRouter;