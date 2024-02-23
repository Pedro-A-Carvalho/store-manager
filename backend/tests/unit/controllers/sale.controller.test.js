const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const saleService = require('../../../src/services/sale.service');
const saleController = require('../../../src/controllers/sale.controller');
const { salesFromModel, saleFromModel } = require('../mocks/sale.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Tests from Sale Controller', function () {
  it('Should return an array of sales from /sales', async function () {
    sinon.stub(saleService, 'getAllSales').resolves({ status: 'SUCCESSFUL', data: salesFromModel });
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.listSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromModel);
  });

  it('Should return a single sale from /sales/:id', async function () {
    sinon.stub(saleService, 'getSaleByID').resolves({ status: 'SUCCESSFUL', data: saleFromModel });
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.findSale(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleFromModel);
  });

  it('Should return a not found message from /sales/:id', async function () {
    sinon.stub(saleService, 'getSaleByID').resolves({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.findSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Should insert a sale in the database', async function () {
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
    sinon.stub(saleService, 'insertSale').resolves({ status: 'CREATED', data: { id: 1, itemsSold: sale } });
    const req = { body: sale };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.createSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 1, itemsSold: sale });
  });

  afterEach(function () {
    sinon.restore();
  });
});
