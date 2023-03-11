import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { MagicLoginStrategy } from './magiclogin.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'jwt-secret',
      signOptions: { expiresIn: '24h' },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: '587',
        auth: {
          user: 'user',
          pass: 'pass',
        },
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MagicLoginStrategy, JwtStrategy],
})
export class AuthModule {}
