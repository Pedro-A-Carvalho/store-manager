const camelize = require('camelize');
const connection = require('./connection');

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
  
module.exports = {
  getAll,
  findById,
};