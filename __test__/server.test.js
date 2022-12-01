'use strict';

const { app } = require('../src/server.js');
const supertest = require('supertest');
const { sequelizeDatabase } = require('../src/models/index.js');
const request = supertest(app);

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('REST API',  () => {



  test('Handles invalid requests', async () => {
    const response = await request.get('/foo');
    expect(response.status).toEqual(404)
  });

  test('Creates a cutomer', async () => {
    let response = await request.post('/customer').send({
      name: 'tim',
      age: 50,
      pronouns: 'he/him'
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('tim');
    expect(response.body.age).toEqual(50);
    expect(response.body.pronouns).toEqual('he/him');
  });

  test('find all customers', async () => {
    let response =  await request.get('/customer');

    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('tim');
    expect(response.body[0].age).toEqual(50);
    expect(response.body[0].pronouns).toEqual('he/him');
  });

  it('sends a 404 status when on a bad route', async() => {
    const response = await request.get('/badroute');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Not Found');
  });

});