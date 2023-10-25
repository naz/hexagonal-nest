import { User } from '../entities/user.entity';

export class UserDto {
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.age = user.age;
    this.roles = user.roles;
  }

  id: string;
  email: string;
  name: string;
  age: number;

  roles: string[];
}
