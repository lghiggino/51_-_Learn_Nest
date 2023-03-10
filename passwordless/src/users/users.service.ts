import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  public users: User[] = [
    {
      id: 1,
      email: 'mango@mango.com',
      name: 'Mango',
    },
    {
      id: 2,
      email: 'dumbo@dumbo.com',
      name: 'Dumbo',
    },
  ];

  findOneByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
