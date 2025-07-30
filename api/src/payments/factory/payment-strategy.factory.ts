import { BadRequestException, Injectable } from '@nestjs/common';
import { IPaymentStrategyFactory } from './payment-strategy.interface';
import { IPaymentStrategy } from '../strategies/payment-strategy.interface';

@Injectable()
export class PaymentStrategyFactory implements IPaymentStrategyFactory {
  private paymentStrategies: Map<string, IPaymentStrategy>;

  constructor() {
    this.paymentStrategies = new Map<string, IPaymentStrategy>();
  }

  registerPayment(name: string, strategy: IPaymentStrategy): void {
    this.paymentStrategies.set(name, strategy);
  }

  getPayment(name: string): IPaymentStrategy {
    const paymentStrategy = this.paymentStrategies.get(name);
    
    if (!paymentStrategy) {
      throw new BadRequestException(`Payment strategy ${name} not supported`);
    }

    return paymentStrategy;
  }

  getAvailablePayments(): string[] {
    return Array.from(this.paymentStrategies.keys());
  }
}
