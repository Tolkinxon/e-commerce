const fs = require('fs/promises');
const { createReadStream } = require('fs');
const { Router } = require('express');
const { globalError, ClientError } = require('shokhijakhon-error-handler');
const path = require('path');
const authRouter = require('./auth.routes');
const orderRouter = require('./order.routes');

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/order', orderRouter);

module.exports = mainRouter;