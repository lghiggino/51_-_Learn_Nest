import {
  Controller,
  Post,
  Get,
  Req,
  Res,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { MagicLoginStrategy } from './magiclogin.strategy';
import { PasswordLessLoginDto } from './passwordless-login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly strategy: MagicLoginStrategy,
  ) {}

  @Post('login')
  login(
    @Req() req,
    @Res() res,
    @Body(new ValidationPipe()) body: PasswordLessLoginDto,
  ) {
    this.authService.validateUser(body.destination);
    return this.strategy.send(req, res);
  }

  @UseGuards(AuthGuard('magiclogin'))
  @Get('login/callback')
  callback(@Req() req) {
    return this.authService.generateTokens(req.user);
  }
}
