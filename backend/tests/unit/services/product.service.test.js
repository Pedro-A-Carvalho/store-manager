const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../src/models/product.model');
const productService = require('../../../src/services/product.service');
const { productsFromModel, singleProductFromModel } = require('../mocks/product.mock');

describe('Tests from Product Service', function () {
  it('Should return an array of products from /products', async function () {
    sinon.stub(productModel, 'getAll').resolves(productsFromModel);

    const products = await productService.getAllProducts();

    expect(products).to.be.an('object');
    expect(products.data).to.be.an('array');
    expect(products.status).to.be.equal('SUCCESSFUL');
    expect(products.data).to.be.deep.equal(productsFromModel);
  });

  it('Should return a single product from /products/:id', async function () {
    sinon.stub(productModel, 'findById').resolves(singleProductFromModel);
    
    const product = await productService.getProductByID(1);
    
    expect(product).to.be.an('object');
    expect(product.status).to.be.equal('SUCCESSFUL');
    expect(product.data).to.be.deep.equal(singleProductFromModel);
  });

  it('Should return a not found message from GET /products/:id', async function () {
    sinon.stub(productModel, 'findById').resolves(null);
    
    const product = await productService.getProductByID(1);
    
    expect(product).to.be.an('object');
    expect(product.status).to.be.equal('NOT_FOUND');
    expect(product.data.message).to.be.equal('Product not found');
  });

  it('Should insert a product in the database', async function () {
    sinon.stub(productModel, 'insert').resolves(1);
    // sinon.stub(productModel, 'findById').resolves({ id: 1, name: 'Product Test' });

    const product = {
      name: 'Product Test',
    };

    const newProduct = await productService.insertProduct(product);

    expect(newProduct.status).to.be.equal('CREATED');
    expect(newProduct.data).to.be.an('object');
    expect(newProduct.data).to.be.deep.equal({ id: 1, name: 'Product Test' });
  });

  it('Should update a product in the database', async function () {
    sinon.stub(productModel, 'update').resolves();
    sinon.stub(productModel, 'findById').resolves({ id: 1, name: 'Martelo do Batman' });

    const product = {
      name: 'Martelo do Batman',
    };

    const updatedProduct = await productService.updateProduct(1, product);

    expect(updatedProduct.status).to.be.equal('SUCCESSFUL');
    expect(updatedProduct.data).to.be.an('object');
    expect(updatedProduct.data).to.be.deep.equal({ id: 1, name: 'Martelo do Batman' });
  });

  it('Should return a not found message from PUT /products/:id', async function () {
    sinon.stub(productModel, 'update').resolves();
    sinon.stub(productModel, 'findById').resolves(null);

    const product = {
      name: 'Martelo do Batman',
    };

    const updatedProduct = await productService.updateProduct(1, product);

    expect(updatedProduct.status).to.be.equal('NOT_FOUND');
    expect(updatedProduct.data.message).to.be.equal('Product not found');
  });

  it('Should delete a product from the database', async function () {
    sinon.stub(productModel, 'deleteProduct').resolves();
    sinon.stub(productModel, 'findById').resolves({ id: 1, name: 'Martelo de Jorge' });

    const deletedProduct = await productService.deleteProduct(1);

    expect(deletedProduct.status).to.be.equal('DELETED');
  });

  it('Should return a not found message from DELETE /products/:id', async function () {
    sinon.stub(productModel, 'deleteProduct').resolves();
    sinon.stub(productModel, 'findById').resolves(null);

    const deletedProduct = await productService.deleteProduct(1);

    expect(deletedProduct.status).to.be.equal('NOT_FOUND');
    expect(deletedProduct.data.message).to.be.equal('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});