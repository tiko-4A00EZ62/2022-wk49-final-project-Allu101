const express = require('express');
const {
  createExpense,
  deleteById,
  getAllExpenses,
  getAllExpensesByMonth,
  updateExpense,
} = require('../controllers/expenses');

const router = express.Router();

router.post('/', createExpense);
router.delete('/:id', deleteById);
router.get('/', getAllExpenses);
router.get('/month/:id', getAllExpensesByMonth);
router.put('/', updateExpense);

module.exports = router;
