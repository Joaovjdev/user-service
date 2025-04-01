import request from 'supertest';
import { app } from '../../app';
import { database } from '../../config/database';

describe('Register Integration Tests', () => {
  afterAll(async () => {
    await database.close();
  });

  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        email: 'teste@exemplo.com',
        password: 'Teste123',
        name: 'Usuário Teste',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user.email).toBe('teste@exemplo.com');
    expect(response.body.user.name).toBe('Usuário Teste');
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
  });

  it('should not register user with invalid email', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        email: 'email-invalido',
        password: 'Teste123',
        name: 'Usuário Teste',
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toContain('O email deve ser válido');
  });

  it('should not register user with weak password', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        email: 'teste@exemplo.com',
        password: '123',
        name: 'Usuário Teste',
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toContain('A senha deve ter no mínimo 6 caracteres');
    expect(response.body.errors).toContain('A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número');
  });

  it('should not register user with existing email', async () => {
    // Primeiro registro
    await request(app)
      .post('/api/users/register')
      .send({
        email: 'teste@exemplo.com',
        password: 'Teste123',
        name: 'Usuário Teste',
      });

    // Tentativa de registro com mesmo email
    const response = await request(app)
      .post('/api/users/register')
      .send({
        email: 'teste@exemplo.com',
        password: 'Teste123',
        name: 'Outro Usuário',
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('User already exists');
  });
}); 