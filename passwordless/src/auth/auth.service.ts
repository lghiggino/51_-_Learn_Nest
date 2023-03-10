import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser(email: string) {
    const user = this.usersService.findOneByEmail(email);

    if (!user) {
      //add user to db
      const usersArray = this.usersService.users;
      const generatedId = this.usersService.users.length + 1;
      this.usersService.users = [
        ...usersArray,
        {
          id: generatedId,
          email: email,
          name: '',
        },
      ];
      // throw new UnauthorizedException();
    }

    return user;
  }

  generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
