const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const expenseRouter = require('./routes/expense');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/expense', expenseRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Backend is listening on PORT ${PORT}`);
});
