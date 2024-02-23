const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5),
});

const saleSchema = Joi.object({
  productId: Joi.number(),
  quantity: Joi.number().integer().min(1).required(),
});

module.exports = {
  productSchema,
  saleSchema,
};