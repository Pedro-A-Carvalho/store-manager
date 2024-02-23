const { saleModel, productModel } = require('../models');
const schema = require('./validations/validadeSaleInput');

const getAllSales = async () => {
  const sales = await saleModel.getAll();
  return { status: 'SUCCESSFUL', data: sales };
};

const getSaleByID = async (saleId) => {
  const sale = await saleModel.findById(saleId);
  if (sale.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

  return { status: 'SUCCESSFUL', data: sale };
};

const insertSale = async (sale) => {
  const error = schema.validateCreateSale(sale);
  if (error) return { status: error.status, data: { message: error.message } };

  const promises = sale.map((item) => productModel.findById(item.productId));
  const finished = await Promise.all(promises);

  if (finished.some((product) => !product)) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  const saleId = await saleModel.insert(sale);
  // const newProduct = await productModel.findById(productId);

  return { status: 'CREATED', data: { id: saleId, itemsSold: sale } };
};

module.exports = {
  getAllSales,
  getSaleByID,
  insertSale,
};