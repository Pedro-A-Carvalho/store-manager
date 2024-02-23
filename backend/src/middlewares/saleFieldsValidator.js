const Joi = require('joi');

const saleSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().required(),
});

const validateCreateSaleMiddleware = (req, res, next) => {
  const errors = [];
  req.body.forEach((item) => {
    const { error } = saleSchema.validate(item);
    if (error) errors.push(error.message);
  });
  
  if (errors.length) return res.status(400).json({ message: errors[0] });
  next();
};

module.exports = {
  validateCreateSaleMiddleware,
};