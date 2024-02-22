const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const saleModel = require('../../../src/models/sale.model');
const { saleFromModel, salesFromModel } = require('../mocks/sale.mock');

describe('Tests from Sale Model', function () {
  it('Should return an array of sales from /sales', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromModel]);

    const sales = await saleModel.getAll();

    expect(sales).to.be.an('array');
    expect(sales[0]).to.be.an('object');
    expect(sales).to.be.deep.equal(salesFromModel);
  });

  it('Should return a single sale from /sales/:id', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromModel]);

    const sale = await saleModel.findById(1);

    expect(sale).to.be.an('array');
    expect(sale[0]).to.be.an('object');
    expect(sale).to.be.deep.equal(saleFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});