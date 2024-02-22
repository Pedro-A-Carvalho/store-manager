const { saleModel } = require('../models');

const getAllSales = async () => {
  const sales = await saleModel.getAll();
  return { status: 'SUCCESSFUL', data: sales };
};

const getSaleByID = async (saleId) => {
  const sale = await saleModel.findById(saleId);
  if (sale.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

  return { status: 'SUCCESSFUL', data: sale };
};

module.exports = {
  getAllSales,
  getSaleByID,
};