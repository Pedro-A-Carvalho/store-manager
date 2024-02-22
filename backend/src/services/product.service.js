const { productModel } = require('../models');

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
  const productId = productModel.insert(product);
  const newProduct = productModel.findById(productId);

  return { status: 'CREATED', data: newProduct };
};

module.exports = {
  getAllProducts,
  getProductByID,
  insertProduct,
};