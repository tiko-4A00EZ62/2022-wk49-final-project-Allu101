const connection = require('../db/connection');

const connectionFunctions = {
  createExpense: (expense) =>
    new Promise((resolve, reject) => {
      const createQuery = 'INSERT INTO expenses SET ?';
      connection.query(createQuery, expense, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),
  deleteExpense: (id) =>
    new Promise((resolve, reject) => {
      const deleteQuery = 'DELETE FROM expenses WHERE id=?;';
      connection.query(deleteQuery, id, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),

  getAllExpenses: () =>
    new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM expenses';
      connection.query(selectQuery, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),
  getAllExpensesByCategory: (category) =>
    new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM expenses WHERE category=?;';
      connection.query(selectQuery, category, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),
  getAllExpensesByCategoryAndShop: (category, shop) =>
    new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM expenses WHERE category=? AND shop=?;';
      connection.query(selectQuery, [category, shop], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),
  getAllExpensesByMonthId: (id) =>
    new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM expenses WHERE MONTH(date)=?;';
      connection.query(selectQuery, id, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),
  getAllExpensesByShop: (shop) =>
    new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM expenses WHERE shop=?;';
      connection.query(selectQuery, shop, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),
  getById: (id) =>
    new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM expenses WHERE id=?';
      connection.query(selectQuery, id, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),
  updateExpense: (expense) =>
    new Promise((resolve, reject) => {
      const updateQuery =
        'UPDATE expenses SET date = ?, amount = ?, category = ?, shop = ? WHERE id = ?;';
      connection.query(
        updateQuery,
        [
          expense.date,
          expense.amount,
          expense.category,
          expense.shop,
          expense.id,
        ],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    }),
};

module.exports = connectionFunctions;
