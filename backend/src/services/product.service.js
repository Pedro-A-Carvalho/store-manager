const { productModel } = require('../models');
const schema = require('./validations/validateProductInput');

const getAllProducts = async () => {
  const products = await productModel.getAll();
  return { status: 'SUCCESSFUL', data: products };
};

const getProductByID = async (productId) => {
  const product = await productModel.findById(productId);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  return { status: 'SUCCESSFUL', data: product };
};

const insertProduct = async (product) => {
  const error = schema.validateProduct(product);
  if (error) return { status: error.status, data: { message: error.message } };

  const productId = await productModel.insert(product);
  // const newProduct = await productModel.findById(productId);

  return { status: 'CREATED', data: { id: productId, ...product } };
};

const updateProduct = async (productId, product) => {
  const error = schema.validateProduct(product);
  if (error) return { status: error.status, data: { message: error.message } };

  await productModel.update(productId, product);

  const updatedProduct = await productModel.findById(productId);
  if (!updatedProduct) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  return { status: 'SUCCESSFUL', data: updatedProduct };
};

module.exports = {
  getAllProducts,
  getProductByID,
  insertProduct,
  updateProduct,
};