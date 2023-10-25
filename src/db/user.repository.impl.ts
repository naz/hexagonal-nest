import { User } from '../ghost/user/entities/user.entity';
import { IUserRepository } from '../ghost/user/user.repository';

export class UserRepositoryImpl implements IUserRepository {
  idMap: Map<string, User>;
  emailMap: Map<string, string>;
  constructor() {
    this.idMap = new Map();
    this.emailMap = new Map();
  }

  async findAll(): Promise<User[]> {
    return [...this.idMap.values()];
  }

  async findById(id: string): Promise<User | undefined> {
    return this.idMap.get(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const id = this.emailMap.get(email);
    if (!id) return undefined;
    return this.findById(id);
  }

  async save(user: User): Promise<void> {
    this.idMap.set(user.id, user);
    this.emailMap.set(user.email, user.id);
  }
}
