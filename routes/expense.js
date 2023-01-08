const express = require('express');
const {
  createInvoice,
  deleteById,
  getAllExpenses,
  getById,
  updateInvoice,
} = require('../controllers/expense');

const router = express.Router();

/*router.post('/', createInvoice);
router.delete('/:id', deleteById);*/
router.get('/', getAllExpenses);
/*router.get('/:id', getById);
router.put('/', updateInvoice);*/

module.exports = router;
