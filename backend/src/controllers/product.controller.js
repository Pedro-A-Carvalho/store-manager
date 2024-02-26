const { productService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const listProducts = async (req, res) => {
  const { status, data } = await productService.getAllProducts();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.getProductByID(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const createProduct = async (req, res) => {
  const { status, data } = await productService.insertProduct(req.body);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.updateProduct(id, req.body);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  listProducts,
  findProduct,
  createProduct,
  updateProduct,
};