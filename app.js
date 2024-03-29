const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const expenseRouter = require('./routes/expenses');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/health', (req, res) => {
  res.send('OK');
});
app.use('/api/expenses', expenseRouter);

module.exports = app;
