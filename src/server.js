'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const notFound = require('./handlers/404');
const errorHandler = require('./handlers/500');

const PORT = process.env.PORT || 3002;
const customerRouter = require('./routes/customers');
const clothRouter = require('./routes/cloths');

const app = express();
app.use(cors());
app.use(express.json());
app.use(customerRouter);
app.use(clothRouter);

app.get('/', (req, res, next) => {
  res.status(200).send('Welcome');
});

app.use('*', notFound);
app.use(errorHandler);

function start() {
  app.listen(PORT, () => console.log('we are live on port', PORT));
}

module.exports = { app, start}