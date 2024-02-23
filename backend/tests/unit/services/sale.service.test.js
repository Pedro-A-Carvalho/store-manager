const { expect } = require('chai');
const sinon = require('sinon');
const saleModel = require('../../../src/models/sale.model');
const saleService = require('../../../src/services/sale.service');
const { salesFromModel, saleFromModel } = require('../mocks/sale.mock');

describe('Tests from Sale Service', function () {
  it('Should return an array of sales from /sales', async function () {
    sinon.stub(saleModel, 'getAll').resolves(salesFromModel);

    const sales = await saleService.getAllSales();

    expect(sales).to.be.an('object');
    expect(sales.data).to.be.an('array');
    expect(sales.status).to.be.equal('SUCCESSFUL');
    expect(sales.data).to.be.deep.equal(salesFromModel);
  });

  it('Should return a single sale from /sales/:id', async function () {
    sinon.stub(saleModel, 'findById').resolves(saleFromModel);
    
    const sale = await saleService.getSaleByID(1);
    
    expect(sale).to.be.an('object');
    expect(sale.status).to.be.equal('SUCCESSFUL');
    expect(sale.data).to.be.deep.equal(saleFromModel);
  });

  it('Should return a not found message from /sales/:id', async function () {
    sinon.stub(saleModel, 'findById').resolves([]);
    
    const sale = await saleService.getSaleByID(1);
    
    expect(sale).to.be.an('object');
    expect(sale.status).to.be.equal('NOT_FOUND');
    expect(sale.data.message).to.be.equal('Sale not found');
  });

  it('Should insert a sale in the database', async function () {
    sinon.stub(saleModel, 'insert').resolves(1);
    // sinon.stub(saleModel, 'findById').resolves({ id: 1, name: 'sale Test' });

    const sale = [
      {
        productId: 1,
        quantity: 2,
      },
      {
        productId: 2,
        quantity: 3,
      },
    ];

    const newSale = await saleService.insertSale(sale);

    expect(newSale.status).to.be.equal('CREATED');
    expect(newSale.data).to.be.an('object');
    expect(newSale.data).to.be.deep.equal({ id: 1, itemsSold: sale });
  });

  it('Should fail to insert a sale in the database if the product does not exist', async function () {
    // sinon.stub(saleModel, 'insert').resolves(1);
    sinon.stub(Promise, 'all').resolves([undefined]);

    const sale = [
      {
        productId: 1,
        quantity: 2,
      },
    ];

    const newSale = await saleService.insertSale(sale);

    expect(newSale.status).to.be.equal('NOT_FOUND');
    expect(newSale.data).to.be.an('object');
    expect(newSale.data.message).to.be.equal('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});