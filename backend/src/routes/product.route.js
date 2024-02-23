const productRouter = require('express').Router();
const { productController } = require('../controllers');
const { validateCreateProductMiddleware } = require('../middlewares/productFieldsValidator');

productRouter.get('/', productController.listProducts);
productRouter.get('/:id', productController.findProduct);
productRouter.post('/', validateCreateProductMiddleware, productController.createProduct);

module.exports = productRouter;