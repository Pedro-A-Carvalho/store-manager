const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(1),
});

module.exports = {
  productSchema,
};