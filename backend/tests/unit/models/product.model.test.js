const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/product.model');
const { productsFromDb, singleProductFromDb } = require('../mocks/product.mock');

describe('Tests from Product Model', function () {
  it('Should return an array of products from /products', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDb]);

    const products = await productModel.getAll();

    expect(products).to.be.an('array');
    expect(products[0]).to.be.an('object');
    expect(products).to.be.deep.equal(productsFromDb);
  });

  it('Should return a single product from /products/:id', async function () {
    sinon.stub(connection, 'execute').resolves([[singleProductFromDb]]);

    const product = await productModel.findById(1);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(singleProductFromDb);
  });

  afterEach(function () {
    sinon.restore();
  });
});