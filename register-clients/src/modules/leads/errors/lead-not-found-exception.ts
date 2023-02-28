import { HttpException, HttpStatus } from '@nestjs/common';

export class LeadNotFoundException extends HttpException {
  constructor() {
    super('User not found', HttpStatus.BAD_REQUEST);
  }
}
