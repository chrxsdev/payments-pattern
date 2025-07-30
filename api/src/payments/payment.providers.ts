import { PaymentMethods } from './constants';
import { PaypalStrategy } from './strategies/paypal.strategy';
import { StripeStrategy } from './strategies/stripe.strategy';

export const PAYMENT_PROVIDERS = [
  {
    provide: PaymentMethods.PAYPAL,
    useClass: PaypalStrategy,
  },
  {
    provide: PaymentMethods.STRIPE,
    useClass: StripeStrategy,
  },
];
