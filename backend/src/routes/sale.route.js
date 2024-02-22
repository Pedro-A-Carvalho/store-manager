const saleRouter = require('express').Router();
const { saleController } = require('../controllers');

saleRouter.get('/', saleController.listSales);
saleRouter.get('/:id', saleController.findSale);

module.exports = saleRouter;