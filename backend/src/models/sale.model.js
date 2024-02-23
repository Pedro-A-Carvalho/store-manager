const camelize = require('camelize');
const connection = require('./connection');
const { getFormattedColumnNames, getFormattedPlaceholders } = require('../utils/formatedQueries');

const getAll = async () => {
  const [sales] = await connection
    .execute(`SELECT
    SP.sale_id, 
    SL.date,
    SP.product_id, 
    SP.quantity 
    FROM sales AS SL
    INNER JOIN sales_products AS SP 
    ON SL.id = SP.sale_id 
    ORDER BY id ASC;`);
  return camelize(sales);
};

const findById = async (saleId) => {
  const [sale] = await connection
    .execute(`SELECT
    SL.date,
    SP.product_id, 
    SP.quantity 
    FROM sales SL
    INNER JOIN sales_products AS SP 
    ON SL.id = SP.sale_id  
    WHERE id = ?`, [saleId]);
  return camelize(sale);
};

const insert = async (sale) => {
  const date = new Date();
  const formattedDate = date.toISOString().split('T');
  formattedDate[1] = formattedDate[1].slice(0, -1);
  const [{ insertId }] = await connection
    .execute('INSERT INTO sales (date) VALUES (?)', [formattedDate.join(' ')]);
  const columns = `sale_id,${getFormattedColumnNames(sale[0])}`;
  const placeholders = `?,${getFormattedPlaceholders(sale[0])}`;
  const query = `INSERT INTO sales_products (${columns}) VALUES (${placeholders});`;

  const insertPromises = sale
    .map(({ productId, quantity }) => connection.execute(query, [insertId, productId, quantity]));
  await Promise.all(insertPromises);

  return insertId;
};
  
module.exports = {
  getAll,
  findById,
  insert,
};