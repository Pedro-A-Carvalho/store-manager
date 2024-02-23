const connection = require('./connection');
const { 
  getFormattedColumnNames, 
  getFormattedPlaceholders } = require('../utils/formatedQueries');

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

const insert = async (product) => {
  const columns = getFormattedColumnNames(product);
  const placeholders = getFormattedPlaceholders(product);
  const query = `INSERT INTO products (${columns}) VALUES (${placeholders});`;

  const [{ insertId }] = await connection.execute(query, [...Object.values(product)]);

  return insertId;
};
  
module.exports = {
  getAll,
  findById,
  insert,
};