import { Injectable, OnModuleInit } from '@nestjs/common';
import { PaypalStrategy } from '../strategies/paypal.strategy';
import { StripeStrategy } from '../strategies/stripe.strategy';
import { PaymentStrategyFactory } from '../factory/payment-strategy.factory';
import { PaymentMethods } from '../constants';

@Injectable()
export class PaymentStrategyRegistry implements OnModuleInit {
  constructor(private readonly paymentStrategyFactory: PaymentStrategyFactory) {}

  onModuleInit() {
    this.paymentStrategyFactory.registerPayment(PaymentMethods.PAYPAL, new PaypalStrategy());
    this.paymentStrategyFactory.registerPayment(PaymentMethods.STRIPE, new StripeStrategy());
  }
}
