const request = require('supertest');
const app = require('../server');

describe('Task Queue API', () => {
  it('should process a task for a user', async () => {
    const response = await request(app)
      .post('/api/v1/task')
      .send({ user_id: '123' });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Task queued');
  });

  it('should respect rate limiting', async () => {
    // Simulate multiple requests to check rate limiting
    for (let i = 0; i < 25; i++) {
      await request(app)
        .post('/api/v1/task')
        .send({ user_id: '123' });
    }
  });
});
