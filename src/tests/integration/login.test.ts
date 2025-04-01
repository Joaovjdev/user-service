import request from 'supertest';
import { app } from '../../app';
import { database } from '../../config/database';

describe('Login Integration Tests', () => {
  afterAll(async () => {
    await database.close();
  });

  it('should login successfully', async () => {
    // Registra um usuário
    await request(app)
      .post('/api/users/register')
      .send({
        email: 'login@exemplo.com',
        password: 'Teste123',
        name: 'Usuário Login',
      });

    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'login@exemplo.com',
        password: 'Teste123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user.email).toBe('login@exemplo.com');
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
  });

  it('should not login with wrong password', async () => {
    // Registra um usuário
    await request(app)
      .post('/api/users/register')
      .send({
        email: 'login@exemplo.com',
        password: 'Teste123',
        name: 'Usuário Login',
      });

    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'login@exemplo.com',
        password: 'SenhaErrada',
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid password');
  });

  it('should not login with non-existent email', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'naoexiste@exemplo.com',
        password: 'Teste123',
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('User not found');
  });
}); 