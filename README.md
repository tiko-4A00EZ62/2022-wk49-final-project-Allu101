# 4A00EZ62 Backend Development - Final Project

## Project topic

Create an application for tracking your personal expenses.

## API URL and endpoints

URL: https://expense-api-g1wn.onrender.com/api/expenses/

Endpoints:

```
GET /api/expenses
POST /api/expenses
PUT /api/expenses
DELETE /api/expenses/{id}
GET /api/expenses/month/{monthId}
```

(Note: if render service has spun down the first request may have a 20-30s delay)

## API Reference

Swagger documentation for API: https://tiko-4a00ez62.github.io/2022-wk49-final-project-Allu101/#/expenses/get_expenses

## Running the application locally

1. On project root run `npm install`
2. Change .env file variables to correct
3. Add default data to database
4. Run `node index.js`

### .evn file template

```
DB_HOST = ""
DB_DB = ""
DB_USER = ""
DB_PASSWORD = ""
```

### Add default data to database

Create table:

```
CREATE TABLE expenses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  date TIMESTAMP NOT NULL,
  amount INT NOT NULL,
  category VARCHAR(50) NOT NULL,
  shop VARCHAR(40) NOT NULL
);
```

Insert data:

```
INSERT INTO expenses (date, amount, category, shop) VALUES ("2022-01-08 13:41:00", 35, "food", "citymarket");
INSERT INTO expenses (date, amount, category, shop) VALUES ("2023-04-08 10:19:00", 70, "food", "Lidl");
INSERT INTO expenses (date, amount, category, shop) VALUES ("2023-06-24 09:19:00", 1300, "PC", "Verkkokauppa.com");
INSERT INTO expenses (date, amount, category, shop) VALUES ("2023-03-24 08:19:00", 1500, "laptop", "Verkkokkauppa.com");
```

## Tests

On project root run: `npm run test`

(Note: sortAmount and sortDate tests only work on default data so if you modify/manipulate data run tests first.)

## Self evaluation
```
Design: ~15
Execution: 30
Requirements Satisfaction: ~15-20
Coding Style: ~15-19
Documentation: 11-14
Bonus Credit: 0-5 (total amount of the retrieved list of expenses)
```
