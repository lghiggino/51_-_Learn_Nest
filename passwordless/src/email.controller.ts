import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('email')
export class EmailController {
  constructor(
    private mailService: MailerService,
    private configService: ConfigService,
  ) {}

  @Get('plain-text-email')
  async plainTextEmail(@Query('toemail') toemail) {
    await this.mailService.sendMail({
      to: toemail,
      from: this.configService.get('SENDGRID_MAIL_SENDER'),
      subject: 'Simple Plain Text',
      text: 'Hello world?',
    });

    return 'success';
  }
}
