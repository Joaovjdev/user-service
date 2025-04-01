import dotenv from 'dotenv';
import { database } from '../config/database';
import { User } from '../models/user.model';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Configura um timeout maior para os testes
jest.setTimeout(10000);

// Inicializa o banco de dados antes de todos os testes
beforeAll(async () => {
  try {
    await database.authenticate();
    await database.sync({ alter: true });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
});

// Limpa as tabelas antes de cada teste
beforeEach(async () => {
  await User.destroy({ where: {}, truncate: true });
});

// Fecha a conexão com o banco de dados após todos os testes
afterAll(async () => {
  await database.close();
}); 