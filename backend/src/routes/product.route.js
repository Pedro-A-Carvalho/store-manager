const productRouter = require('express').Router();
const { productController } = require('../controllers');

productRouter.get('/', productController.listProducts);
productRouter.get('/:id', productController.findProduct);
productRouter.post('/', productController.createProduct);

module.exports = productRouter;