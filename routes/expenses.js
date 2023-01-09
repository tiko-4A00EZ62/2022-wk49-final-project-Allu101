const express = require('express');
const {
  createInvoice,
  deleteById,
  getAllExpenses,
  getById,
  updateExpense,
} = require('../controllers/expenses');

const router = express.Router();

/*router.post('/', createInvoice);
router.delete('/:id', deleteById);*/
router.get('/', getAllExpenses);
router.get('/month/:id', getById);
router.put('/', updateExpense);

module.exports = router;
