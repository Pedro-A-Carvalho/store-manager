const saleRouter = require('express').Router();
const { saleController } = require('../controllers');
const { validateCreateSaleMiddleware } = require('../middlewares/saleFieldsValidator');

saleRouter.get('/', saleController.listSales);
saleRouter.get('/:id', saleController.findSale);
saleRouter.post('/', validateCreateSaleMiddleware, saleController.createSale);

module.exports = saleRouter;