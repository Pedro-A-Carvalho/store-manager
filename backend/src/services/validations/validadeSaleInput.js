const { addSaleSchema } = require('./schemas');

const validateCreateSale = (keysObjectToValidate) => {
  const { error } = addSaleSchema.validate({ data: keysObjectToValidate });
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = {
  validateCreateSale,
};