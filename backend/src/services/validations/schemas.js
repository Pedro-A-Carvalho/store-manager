const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5),
});

const saleSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().required(),
});

const addSaleSchema = Joi.object({
  data: Joi.array().items(saleSchema).required(),
});

module.exports = {
  productSchema,
  addSaleSchema,
};