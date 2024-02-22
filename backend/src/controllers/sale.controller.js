const { saleService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const listSales = async (req, res) => {
  const { status, data } = await saleService.getAllSales();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findSale = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await saleService.getSaleByID(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  listSales,
  findSale,
};