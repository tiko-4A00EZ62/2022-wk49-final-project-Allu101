const expense = require('../models/expense');
//const Joi = require('joi');

/*const createInvoice = async (req, res) => {
  const schema = Joi.object({
    month: Joi.string().required(),
    kwh: Joi.number().min(1).required(),
    cost: Joi.number().min(1).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).send(error.details[0].message);
    return;
  }
  const invoice = {
    month: req.body.month,
    kwh: req.body.kwh,
    cost: req.body.cost,
  };
  try {
    const response = await electricity.create(invoice);
    if (response) {
      invoice.id = response.insertId;
      res.status(201).send(invoice);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

const deleteById = async (req, res) => {
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
    const response = await expense.findAll();
    if (response) {
      const totalSum = response.reduce(
        (total, expense) => total + expense.amount,
        0
      );
      res.send({
        data: response,
        total: totalSum,
      });
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

/*const getById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const response = await electricity.findById(id);
    if (response) {
      res.send(response);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

const updateInvoice = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
    month: Joi.string().min(4).required(),
    kwh: Joi.number().min(1).required(),
    cost: Joi.number().min(1).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).send(error.details[0].message);
    return;
  }
  const invoice = {
    id: req.body.id,
    month: req.body.month,
    kwh: req.body.kwh,
    cost: req.body.cost,
  };
  try {
    const response = await electricity.update(invoice);
    if (response) {
      res.send(invoice);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};*/

module.exports = {
  /*createInvoice,
  deleteById,*/
  getAllExpenses,
  /*getById,
  updateInvoice,*/
};
