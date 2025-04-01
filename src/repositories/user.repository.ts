import { User } from '../models/user.model';

export class UserRepository {
  async create(userData: { email: string; password: string; name: string }): Promise<User> {
    return await User.create(userData);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }
} 