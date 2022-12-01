'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const customersSchema = require('./customers.schema');
const clothsSchema = require('./cloths.schema');


// 'postgres://localhost:5432/api-app'
// 'postgres://username:password@localhost:5432/api-app'
// will use ternary here to set up sqlite for testing

const DATABASE_URL = process.env.NODE_ENV === 'test'
? 'sqlite:memory:' : process.env.DATABASE_URL;
console.log(DATABASE_URL)
const sequelizeDatabase = new Sequelize(DATABASE_URL,{
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const ClothModel = clothsSchema(sequelizeDatabase, DataTypes);
const CustomerModel = customersSchema(sequelizeDatabase, DataTypes);

module.exports = {
  sequelizeDatabase,
  CustomerModel,
  ClothModel,
}