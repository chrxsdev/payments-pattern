import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { PaymentStrategyFactory } from './factory/payment-strategy.factory';
import { PaymentResponse } from './types';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentStrategyFactory: PaymentStrategyFactory) {}

  async processPayment(paymentDto: CreatePaymentDto): Promise<PaymentResponse> {
    const { paymentMethod, amount, metadata } = paymentDto;

    try {
      const payment = this.paymentStrategyFactory.getPayment(paymentMethod);
      return payment.createOrder(amount, metadata);
    } catch (error) {
      console.error({ error });
      throw new InternalServerErrorException(`Payment processing failed: ${error.message}`);
    }
  }

  getPaymentConfig(paymentMethod: string) {
    const payment = this.paymentStrategyFactory.getPayment(paymentMethod);

    if (!payment.config) {
      throw new BadRequestException('Payment method does not support configuration yet');
    }

    const config = payment.config();

    return config;
  }

  capturePayment(orderId: string, paymentMethod: string) {
    const payment = this.paymentStrategyFactory.getPayment(paymentMethod);

    if (!payment.captureOrder) {
      throw new BadRequestException('Payment method does not support capturing orders yet');
    }

    const captureOrder = payment.captureOrder(orderId);

    return captureOrder;
  }
}
