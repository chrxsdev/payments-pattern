import { IPaymentStrategy } from '../strategies/payment-strategy.interface';

export interface IPaymentStrategyFactory {
  registerPayment(name: string, strategy: IPaymentStrategy): void;
  getPayment(name: string): IPaymentStrategy;
  getAvailablePayments(): string[];
}
