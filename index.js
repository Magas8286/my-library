const mongodb = require('./mongodb.utils');
const express = require('express');
const router = require('./routes');

mongodb.createEventListeners();
mongodb.connect();

const app = express();

app.use(express.json());
app.use("/", router);

app.listen('3000', () => {
  console.log('Listening on port 3000');
});