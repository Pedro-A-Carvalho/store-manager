const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productService = require('../../../src/services/product.service');
const productController = require('../../../src/controllers/product.controller');
const { validateProductMiddleware } = require('../../../src/middlewares/productFieldsValidator');
const { getAllProductsFromService, getProductByIDFromService, productsFromModel, singleProductFromModel, getProductByIDFromServiceNotFound } = require('../mocks/product.mock');

const { expect } = chai;
chai.use(sinonChai);

const testName = 'Product Test';

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

  it('Should insert a product in the database', async function () {
    sinon.stub(productService, 'insertProduct').resolves({ status: 'CREATED', data: { id: 1, name: testName } });
    const req = { body: { name: testName } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 1, name: testName });
  });

  it('Should fail to insert product in the database if name is not provided', async function () {
    const req = { body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns(); 

    await validateProductMiddleware(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    expect(next).to.have.not.been.calledWith();
  });

  it('Should fail to insert product in the database if name smaller than 5 characters', async function () {
    sinon.stub(productService, 'insertProduct').resolves({ status: 'INVALID_VALUE', data: { message: '"name" length must be at least 5 characters long' } });
    const req = { body: { name: 'Test' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  it('Should update a product in the database', async function () {
    sinon.stub(productService, 'updateProduct').resolves({ status: 'SUCCESSFUL', data: { id: 1, name: testName } });
    const req = { params: { id: 1 }, body: { name: testName } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 1, name: testName });
  });

  it('Should fail to update product in the database if name is not provided', async function () {
    const req = { params: { id: 1 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns(); 

    await validateProductMiddleware(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    expect(next).to.have.not.been.calledWith();
  });

  it('Should fail to update product in the database if name smaller than 5 characters', async function () {
    sinon.stub(productService, 'updateProduct').resolves({ status: 'INVALID_VALUE', data: { message: '"name" length must be at least 5 characters long' } });
    const req = { params: { id: 1 }, body: { name: 'Test' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  it('Should delete a product from the database', async function () {
    sinon.stub(productService, 'deleteProduct').resolves({ status: 'SUCCESSFUL' });
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      end: sinon.stub(),
    };

    await productController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.end).to.have.been.calledWith();
  });

  afterEach(function () {
    sinon.restore();
  });
});
