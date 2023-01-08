const connection = require('../db/connection');

const connectionFunctions = {
  /*create: (invoice) =>
    new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO electricity SET ?',
        invoice,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    }),
  deleteById: (id) =>
    new Promise((resolve, reject) => {
      const deleteQuery = 'DELETE FROM electricity WHERE id=?;';
      connection.query(deleteQuery, id, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),*/
  findAll: () =>
    new Promise((resolve, reject) => {
      connection.query('SELECT * FROM expenses', (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),
  /*findById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM electricity WHERE id=?',
        id,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    }),
  update: (invoice) =>
    new Promise((resolve, reject) => {
      const updateQuery =
        'UPDATE electricity SET month = ?, kwh = ?, cost = ? WHERE id = ?;';
      connection.query(
        updateQuery,
        [invoice.month, invoice.kwh, invoice.cost, invoice.id],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    }),*/
};

module.exports = connectionFunctions;
