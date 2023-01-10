const connection = require('../db/connection');

const connectionFunctions = {
  create: (expense) =>
    new Promise((resolve, reject) => {
      connection.query('INSERT INTO expenses SET ?', expense, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),
  /*deleteById: (id) =>
    new Promise((resolve, reject) => {
      const deleteQuery = 'DELETE FROM electricity WHERE id=?;';
      connection.query(deleteQuery, id, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),*/

  getAll: () =>
    new Promise((resolve, reject) => {
      connection.query('SELECT * FROM expenses', (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),
  getByMonthId: (id) =>
    new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM expenses WHERE MONTH(date)=?;';
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
