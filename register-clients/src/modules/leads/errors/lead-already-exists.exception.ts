import { HttpStatus, HttpException } from '@nestjs/common';

export class LeadAlreadyExistsException extends HttpException {
  constructor() {
    super(
      'An error ocurred on create new user, try again latter',
      HttpStatus.BAD_REQUEST,
    );
  }
}
