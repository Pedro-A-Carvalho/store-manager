const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const saleService = require('../../../src/services/sale.service');
const saleController = require('../../../src/controllers/sale.controller');
const { salesFromModel, saleFromModel } = require('../mocks/sale.mock');
const { validateCreateSaleMiddleware } = require('../../../src/middlewares/saleFieldsValidator');

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

  it('Should fail to insert sale in the database if productId is not provided', async function () {
    const req = { body: [{ quantity: 2 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns(); 

    await validateCreateSaleMiddleware(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    expect(next).to.have.not.been.calledWith();
  });

  it('Should fail to insert sale in the database if quantity is not provided', async function () {
    const req = { body: [{ productId: 1 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns(); 

    await validateCreateSaleMiddleware(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    expect(next).to.have.not.been.calledWith();
  });

  it('Should fail to insert sale in the database if quantity is lower than 1', async function () {
    sinon.stub(saleService, 'insertSale').resolves({ status: 'INVALID_VALUE', data: { message: '"quantity" must be greater than or equal to 1' } });
    const req = { body: [{ productId: 1, quantity: 0 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.createSale(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });

  afterEach(function () {
    sinon.restore();
  });
});
