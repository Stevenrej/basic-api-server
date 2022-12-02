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
    let responseTwo = await request.post('/customer').send({
      name: 'greg',
      age: 22,
      pronouns: 'he/him'
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('tim');
    expect(response.body.age).toEqual(50);
    expect(response.body.pronouns).toEqual('he/him');
    expect(responseTwo.body.name).toEqual('greg');
    expect(responseTwo.body.age).toEqual(22);
    expect(responseTwo.body.pronouns).toEqual('he/him');
  });

  test('find all customers', async () => {
    let response =  await request.get('/customer');

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(2);
    expect(response.body[0].name).toEqual('tim');
    expect(response.body[0].age).toEqual(50);
    expect(response.body[0].pronouns).toEqual('he/him');
    expect(response.body[1].name).toEqual('greg');
    expect(response.body[1].age).toEqual(22);
    expect(response.body[1].pronouns).toEqual('he/him');
  });

  test('find a customer', async () => {
    let response =  await request.get('/customer/2');

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('greg');
    expect(response.body.age).toEqual(22);
    expect(response.body.pronouns).toEqual('he/him');
  });

  test('updates a single customer', async () => {
      await request.put('/customer/1').send({
      name: 'jim',
      age: 40,
      pronouns: 'he/him',
    });

    let response = await request.get('/customer/1')

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('jim');
    expect(response.body.age).toEqual(40);
    expect(response.body.pronouns).toEqual('he/him');
  })

  test('deletes customer', async () => {
    await request.delete('/customer/1')

    let response =  await request.get('/customer');

    expect(response.body.length).toEqual(1);
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
    expect(response.body.amount).toEqual(6);
    expect(response.body.type).toEqual('hat');
  });

  test('find all clothss', async () => {
    let response =  await request.get('/cloths');

    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('fedora');
    expect(response.body[0].amount).toEqual(6);
    expect(response.body[0].type).toEqual('hat');
  });

  test('find a cloths', async () => {
    let response =  await request.get('/cloths/1');

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('fedora');
    expect(response.body.amount).toEqual(6);
    expect(response.body.type).toEqual('hat');
  });

  test('updates cloths', async () => {
    await request.put('/cloths/1').send({
      name: 'fitted cap',
      amount: 10,
      type: 'hat',
    });

    let response =  await request.get('/cloths/1');
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('fitted cap');
    expect(response.body.amount).toEqual(10);
    expect(response.body.type).toEqual('hat');
  })

  test('deletes cloths', async () => {
    await request.delete('/cloths/1');
    let response =  await request.get('/cloths');

    expect(response.body.length).toEqual(0);
  })

});