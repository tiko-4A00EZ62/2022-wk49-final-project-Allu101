const expenses = require('../models/expenses');
const Joi = require('joi');

const createExpense = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().integer(),
    date: Joi.string().min(10).required(),
    amount: Joi.number().required(),
    category: Joi.string().min(1).required(),
    shop: Joi.string().min(1).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).send(error.details[0].message);
    return;
  }
  const expense = {
    date: req.body.date,
    amount: req.body.amount,
    category: req.body.category,
    shop: req.body.shop,
  };
  if (req.body.id != undefined) {
    expense.id = req.body.id;
  }
  try {
    const response = await expenses.createExpense(expense);
    if (response) {
      res.status(201).send(expense);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

const deleteById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const result = await expenses.getById(id);
    if (result.length === 0) {
      res.status(404).send('Not Found');
      return;
    }

    const response = await expenses.deleteExpense(id);
    if (response) {
      res.status(200).send('Expense deleted');
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

const getAllExpenses = async (req, res) => {
  try {
    let response;
    if (req.query.shop != undefined) {
      response = await expenses.getAllExpensesByShop(req.query.shop);
    } else {
      response = await expenses.getAllExpenses();
    }

    if (response) {
      const filteredResponse = filterResponse(req, response);
      res.send(getDataAndTotalJSON(filteredResponse));
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

const getAllExpensesByMonth = async (req, res) => {
  const id = parseInt(req.params.id);
  if (id < 1 || id > 12) {
    res.status(400).send('id must be in between 1 and 12');
    return;
  }
  try {
    const response = await expenses.getAllExpensesByMonthId(id);
    if (response) {
      const filteredResponse = filterResponse(req, response);
      res.send(getDataAndTotalJSON(filteredResponse));
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

const updateExpense = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
    date: Joi.string().min(10).required(),
    amount: Joi.number().required(),
    category: Joi.string().min(1).required(),
    shop: Joi.string().min(1).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).send(error.details[0].message);
    return;
  }
  const expense = {
    id: req.body.id,
    date: req.body.date,
    amount: req.body.amount,
    category: req.body.category,
    shop: req.body.shop,
  };
  try {
    const response = await expenses.updateExpense(expense);
    if (response) {
      res.send(expense);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const filterResponse = (req, response) => {
  let output = response;
  if (req.query.sortAmount != undefined) {
    output = response.sort((a, b) => {
      a.amount - b.amount;
    });
    if (req.query.sortAmount === 'desc') {
      output.reverse();
    }
  }
  return output;
};

const getDataAndTotalJSON = (response) => {
  const totalSum = response.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  return {
    data: response,
    total: totalSum,
  };
};

module.exports = {
  createExpense,
  deleteById,
  getAllExpenses,
  getAllExpensesByMonth,
  updateExpense,
};
