const salesFromDb = [
  {
    sale_id: 1,
    date: '2021-09-01',
    product_id: 1,
    quantity: 1,
  },
  {
    sale_id: 1,
    date: '2021-09-01',
    product_id: 2,
    quantity: 2,
  },
  {
    sale_id: 2,
    date: '2021-09-02',
    product_id: 3,
    quantity: 3,
  },
];

const salesFromModel = [
  {
    saleId: 1,
    date: '2021-09-01',
    productId: 1,
    quantity: 1,
  },
  {
    saleId: 1,
    date: '2021-09-01',
    productId: 2,
    quantity: 2,
  },
  {
    saleId: 2,
    date: '2021-09-02',
    productId: 3,
    quantity: 3,
  },
];

const saleFromDb = [
  {
    date: '2021-09-01',
    product_id: 1,
    quantity: 1,
  },
  {
    date: '2021-09-01',
    product_id: 2,
    quantity: 2,
  },
];

const saleFromModel = [
  {
    date: '2021-09-01',
    productId: 1,
    quantity: 1,
  },
  {
    date: '2021-09-01',
    productId: 2,
    quantity: 2,
  },
];

module.exports = {
  salesFromDb,
  salesFromModel,
  saleFromDb,
  saleFromModel,
};
