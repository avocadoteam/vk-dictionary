import { HttpException, HttpStatus } from '@nestjs/common';

export class PaymentRequiredException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    message = 'Payment required',
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        message,
        HttpStatus.PAYMENT_REQUIRED,
      ),
      HttpStatus.PAYMENT_REQUIRED,
    );
  }
}
