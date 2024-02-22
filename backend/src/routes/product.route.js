const productRouter = require('express').Router();
const { productController } = require('../controllers');

productRouter.get('/', productController.listProducts);
productRouter.get('/:id', productController.findProduct);

module.exports = productRouter;