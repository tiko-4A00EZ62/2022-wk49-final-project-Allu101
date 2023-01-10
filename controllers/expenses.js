const expenses = require('../models/expenses');
const Joi = require('joi');

const createExpense = async (req, res) => {
  const schema = Joi.object({
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
  try {
    const response = await expenses.create(expense);
    if (response) {
      res.status(201).send(expense);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

/*const deleteById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const result = await electricity.findById(id);
    if (result.length === 0) {
      res.status(404).send('Not Found');
      return;
    }

    const response = await electricity.deleteById(id);
    if (response) {
      res.status(200).send('Invoice deleted');
    }
  } catch (e) {
    res.sendStatus(500);
  }
};*/

const getAllExpenses = async (req, res) => {
  try {
    const response = await expenses.getAll();
    if (response) {
      res.send(returnExpensesAndTotalSumJSON(response));
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

const getById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const response = await expenses.getByMonthId(id);
    if (response) {
      res.send(returnExpensesAndTotalSumJSON(response));
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

const returnExpensesAndTotalSumJSON = (response) => {
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
  //deleteById,
  getAllExpenses,
  getById,
  updateExpense,
};
