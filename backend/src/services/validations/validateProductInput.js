const { productSchema } = require('./schemas');

const validateCreateProduct = (keysObjectToValidate) => {
  const { error } = productSchema.validate(keysObjectToValidate);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = {
  validateCreateProduct,
};