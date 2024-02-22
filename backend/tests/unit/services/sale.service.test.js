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
  afterEach(function () {
    sinon.restore();
  });
});