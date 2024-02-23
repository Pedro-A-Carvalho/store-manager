const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5),
});

module.exports = {
  productSchema,
};