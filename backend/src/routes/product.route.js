const productRouter = require('express').Router();
const { productController } = require('../controllers');
const { validateProductMiddleware } = require('../middlewares/productFieldsValidator');

productRouter.get('/', productController.listProducts);
productRouter.get('/:id', productController.findProduct);
productRouter.post('/', validateProductMiddleware, productController.createProduct);
productRouter.put('/:id', validateProductMiddleware, productController.updateProduct);
productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;