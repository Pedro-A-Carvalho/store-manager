const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productService = require('../../../src/services/product.service');
const productController = require('../../../src/controllers/product.controller');
const { getAllProductsFromService, getProductByIDFromService, productsFromModel, singleProductFromModel, getProductByIDFromServiceNotFound } = require('../mocks/product.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Tests from Product Controller', function () {
  it('Should return an array of products from /products', async function () {
    sinon.stub(productService, 'getAllProducts').resolves(getAllProductsFromService);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.listProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromModel);
  });

  it('Should return a single product from /products/:id', async function () {
    sinon.stub(productService, 'getProductByID').resolves(getProductByIDFromService);
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.findProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(singleProductFromModel);
  });

  it('Should return a not found message from /products/:id', async function () {
    sinon.stub(productService, 'getProductByID').resolves(getProductByIDFromServiceNotFound);
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.findProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});
