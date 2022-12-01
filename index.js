'use strict';

const { sequelizeDatabase } = require('./src/models');

const {start} = require('./src/server');

sequelizeDatabase.sync()
.then(() => {
  console.log('SUCCESS you connected!');
})
.catch(e => console.log(''));


start();