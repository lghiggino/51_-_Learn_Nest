import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@ApiTags('health')
@Controller('api')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get('/health')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('server', 'https://www.google.com/'),
    ]);
  }

  @Get('/health/protected')
  @UseGuards(AuthGuard('jwt'))
  @HealthCheck()
  protected(@Req() req) {
    console.log('req', req);
    return `Lead ${req.user.email} with uuid ${req.user.uuid} is allowed in protected by JWT route`;
  }
}
