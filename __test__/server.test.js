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

  test('find a customer', async () => {
    let response =  await request.get('/customer/1');

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('tim');
    expect(response.body.age).toEqual(50);
    expect(response.body.pronouns).toEqual('he/him');
  });

  test('updates customer', async () => {
    let response = await request.put('/customer/1').send({
      name: 'jim',
      age: 40,
      pronouns: 'he/him',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('jim');
    expect(response.body.age).toEqual(40);
    expect(response.body.pronouns).toEqual('he/him');
  })

  test('deletes customer', async () => {
    let response = await request.delete('/customer/1')

    expect(response.body).toEqual({});
  })

  it('sends a 404 status when on a bad route', async() => {
    const response = await request.get('/badroute');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Not Found');
  });




  test('Creates a cloth', async () => {
    let response = await request.post('/cloths').send({
      name: 'fedora',
      amount: 6,
      type: 'hat'
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('fedora');
    expect(response.body.age).toEqual(6);
    expect(response.body.pronouns).toEqual('hat');
  });

  test('find all clothss', async () => {
    let response =  await request.get('/cloths');

    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('fedora');
    expect(response.body[0].age).toEqual(6);
    expect(response.body[0].pronouns).toEqual('hat');
  });

  test('find a cloths', async () => {
    let response =  await request.get('/cloths/1');

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('fedora');
    expect(response.body.age).toEqual(6);
    expect(response.body.pronouns).toEqual('HAT');
  });

  test('updates cloths', async () => {
    let response = await request.put('/cloths/1').send({
      name: 'fitted cap',
      age: 10,
      pronouns: 'hat',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('fitted cap');
    expect(response.body.age).toEqual(10);
    expect(response.body.pronouns).toEqual('hat');
  })

  test('deletes cloths', async () => {
    let response = await request.delete('/cloths/1')

    expect(response.body).toEqual({});
  })

});