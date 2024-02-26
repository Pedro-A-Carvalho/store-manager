const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required().min(0),
});

const validateProductMiddleware = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

module.exports = {
  validateProductMiddleware,
};