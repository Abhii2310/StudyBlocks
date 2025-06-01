// Example Jest + Supertest test for authentication API
const request = require('supertest');
const app = require('../index'); // Adjust path if your Express app is exported elsewhere

describe('Auth API', () => {
  it('should return 200 and a success message for GET /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
  });

  // Add more tests for login, register, etc. as needed
});
