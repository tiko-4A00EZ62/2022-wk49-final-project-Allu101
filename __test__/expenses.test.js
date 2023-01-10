const { describe, expect, test, afterAll } = require('@jest/globals');
const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

describe('Expenses endoints', () => {
  describe('GET expenses endoint', () => {
    test('should return 200', (done) => {
      request(app).get('/api/expenses').expect(200).end(done);
    });

    test('should return valid JSON', async () => {
      const response = await request(app)
        .get('/api/expenses')
        .set('Accept', 'application/json');

      expect(response.status).toEqual(200);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toEqual(
        expect.objectContaining({
          data: expect.arrayContaining([
            expect.objectContaining({
              date: '2022-01-08T13:41:00.000Z',
              amount: 35,
              category: 'food',
              shop: 'citymarket',
            }),
            expect.objectContaining({
              date: '2023-03-24T10:19:00.000Z',
              amount: 700,
              category: 'laptop',
              shop: 'Verkkokauppa.com',
            }),
            expect.objectContaining({
              date: '2023-06-24T09:19:00.000Z',
              amount: 1300,
              category: 'PC',
              shop: 'Verkkokauppa.com',
            }),
          ]),
          total: 2035,
        })
      );
    });
  });

  describe('POST expenses endpoint', () => {
    let postEndpointId;
    test('should create a new expense', async () => {
      const expense = {
        id: 50,
        date: '2023-06-25 11:09:00',
        amount: 68,
        category: 'shoes',
        shop: 'Stockmann',
      };

      const response = await request(app)
        .post('/api/expenses')
        .set('Accept', 'application/json')
        .send(expense);
      postEndpointId = response.body.id;

      expect(response.status).toEqual(201);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body.id).toBeTruthy();
      expect(response.body.date).toEqual('2023-06-25 11:09:00');
      expect(response.body.amount).toEqual(68);
      expect(response.body.category).toEqual('shoes');
      expect(response.body.shop).toEqual('Stockmann');
    });

    test('should not allow no amount', async () => {
      const expense = {
        date: '2023-05-15 16:09:00',
        category: 'Something',
        shop: 'Amazon',
      };

      const response = await request(app)
        .post('/api/expenses')
        .set('Accept', 'application/json')
        .send(expense);

      expect(response.status).toEqual(400);
      expect(response.text).toContain('"amount" is required');
    });

    /*test('should not allow no kwh', async () => {
      const invoice = {
        month: '2022-05-01',
        cost: '100',
      };

      const response = await request(app)
        .post('/api/expenses')
        .set('Accept', 'application/json')
        .send(invoice);

      expect(response.status).toEqual(400);
      expect(response.text).toContain('"kwh" is required');
    });*/
    afterAll(async () => {
      await request(app)
        .delete(`/api/expenses/${postEndpointId}`)
        .set('Accept', 'application/json');
    });

    /*test('should not allow no cost', async () => {
      const invoice = {
        month: '2022-05-01',
        kwh: '1100.201',
      };

      const response = await request(app)
        .post('/api/expenses')
        .set('Accept', 'application/json')
        .send(invoice);

      expect(response.status).toEqual(400);
      expect(response.text).toContain('"cost" is required');
    });*/
  });

  describe('PUT expenses endpoint', () => {
    let putEndpointId;
    beforeAll(async () => {
      const expense = {
        id: 40,
        date: '2023-06-18 10:09:00',
        amount: 200,
        category: 'Bed',
        shop: 'Ikea',
      };
      const postResponse = await request(app)
        .post('/api/expenses')
        .set('Accept', 'application/json')
        .send(expense);
      putEndpointId = postResponse.body.id;
    });

    test('should update the expense with the id', async () => {
      const invoice = {
        id: putEndpointId,
        date: '2023-06-18 10:09:00',
        amount: 199,
        category: 'Bed',
        shop: 'Ikea',
      };
      const response = await request(app)
        .put('/api/expenses')
        .set('Accept', 'application/json')
        .send(invoice);
      expect(response.status).toEqual(200);
      expect(response.body.id).toEqual(putEndpointId);
      expect(response.body.date).toEqual('2023-06-18 10:09:00');
      expect(response.body.amount).toEqual(199);
    });

    test('should not allow too short date (min 10 char)', async () => {
      const invoice = {
        id: putEndpointId,
        date: '2023-3-14',
        amount: 199,
        category: 'Bed',
        shop: 'Ikea',
      };
      const response = await request(app)
        .put('/api/expenses')
        .set('Accept', 'application/json')
        .send(invoice);
      expect(response.status).toEqual(400);
      expect(response.text).toEqual(
        '"date" length must be at least 10 characters long'
      );
    });

    afterAll(async () => {
      await request(app)
        .delete(`/api/expenses/${putEndpointId}`)
        .set('Accept', 'application/json');
    });
  });

  describe('DELETE expenses endpoint', () => {
    test('should delete the expense by id', async () => {
      const expense = {
        id: 30,
        date: '2023-04-24 18:41:00',
        amount: 50,
        category: 'Food',
        shop: 'Prisma',
      };
      const postResponse = await request(app)
        .post('/api/expenses')
        .set('Accept', 'application/json')
        .send(expense);
      const postId = postResponse.body.id;

      const response = await request(app)
        .delete(`/api/expenses/${postId}`)
        .set('Accept', 'application/json');
      expect(response.status).toEqual(200);
      expect(response.text).toEqual('Expense deleted');
    });

    test('should check that expense with id exists', async () => {
      const response = await request(app)
        .delete('/api/expenses/100001')
        .set('Accept', 'application/json');

      expect(response.status).toEqual(404);
      expect(response.text).toEqual('Not Found');
    });
  });

  afterAll(async () => {
    connection.end();
  });
});
