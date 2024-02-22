const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection
    .execute('SELECT * FROM products ORDER BY id ASC;');
  return products;
};

const findById = async (productId) => {
  const [[product]] = await connection
    .execute('SELECT * FROM products WHERE id = ?', [productId]);
  return product;
};
  
module.exports = {
  getAll,
  findById,
};