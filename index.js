const app = require('./app');

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Backend is listening on PORT ${PORT}`);
});

/*Create table SQL query:
CREATE TABLE expenses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  date TIMESTAMP NOT NULL,
  amount INT NOT NULL,
  category VARCHAR(50) NOT NULL,
  shop VARCHAR(40) NOT NULL);
  
INSERT DATA:
INSERT INTO expenses (date, amount, category, shop) VALUES ("2022-01-08 15:41:00", 35, "food", "citymarket");
INSERT INTO expenses (date, amount, category, shop) VALUES ("2022-02-18 15:41:00", 52, "food", "prisma");
*/
