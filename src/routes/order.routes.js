const { Router } = require('express');
const orderController = require('../controllers/order.controller');

const orderRouter = Router();

orderRouter.get('/:id/:condition', orderController.CHANGE);

module.exports = orderRouter;