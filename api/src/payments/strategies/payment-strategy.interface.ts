import { PaymentConfigResponse, PaymentResponse } from '../types';

export interface IPaymentStrategy {
  createOrder(amount: number, metadata?: Record<string, any>): Promise<PaymentResponse>;
  captureOrder(orderId: string): Promise<PaymentResponse>;
  config(): PaymentConfigResponse;
}
