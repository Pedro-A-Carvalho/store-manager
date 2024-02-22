const productsFromDb = [
  {
    id: 1,
    name: 'Product 1',
  },
  {
    id: 2,
    name: 'Product 2',
  },
  {
    id: 3,
    name: 'Product 3',
  },
];

const productsFromModel = [
  {
    id: 1,
    name: 'Product 1',
  },
  {
    id: 2,
    name: 'Product 2',
  },
  {
    id: 3,
    name: 'Product 3',
  },
];

const getAllProductsFromService = {
  status: 'SUCCESSFUL',
  data: productsFromModel,
};

const singleProductFromDb = {
  id: 1,
  name: 'Product 1',
};

const singleProductFromModel = {
  id: 1,
  name: 'Product 1',
};

const getProductByIDFromService = {
  status: 'SUCCESSFUL',
  data: singleProductFromModel,
};

const getProductByIDFromServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

module.exports = {
  productsFromDb,
  productsFromModel,
  getAllProductsFromService,
  singleProductFromDb,
  singleProductFromModel,
  getProductByIDFromService,
  getProductByIDFromServiceNotFound,
};
