const { saleSchema } = require('./schemas');

const validateCreateSale = (keysObjectToValidate) => {
  const errors = [];
  keysObjectToValidate.forEach((item) => {
    const { error } = saleSchema.validate(item);
    if (error) errors.push({ status: 'INVALID_VALUE', message: error.message });
  });
  if (errors.length) return errors[0];
};

module.exports = {
  validateCreateSale,
};