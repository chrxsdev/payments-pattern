import { PaymentMethods } from '../constants';

export class CreatePaymentDto {
  paymentMethod: PaymentMethods;
  amount: number;
  metadata?: Record<string, any>;
}
