import request from 'supertest';
import { app } from '../../app';
import { database } from '../../config/database';

describe('Refresh Token Integration Tests', () => {
  afterAll(async () => {
    await database.close();
  });

  it('should refresh token successfully', async () => {
    // Registra um usuário
    const registerResponse = await request(app)
      .post('/api/users/register')
      .send({
        email: 'refresh@exemplo.com',
        password: 'Teste123',
        name: 'Usuário Refresh',
      });

    const { refreshToken } = registerResponse.body;

    const response = await request(app)
      .post('/api/users/refresh-token')
      .send({ refreshToken });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
    expect(response.body.accessToken).not.toBe(refreshToken);
  });

  it('should not refresh with invalid token', async () => {
    const response = await request(app)
      .post('/api/users/refresh-token')
      .send({
        refreshToken: 'token-invalido',
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid refresh token');
  });
}); 