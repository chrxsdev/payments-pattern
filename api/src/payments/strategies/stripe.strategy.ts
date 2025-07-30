import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import { PaymentConfigResponse, PaymentResponse } from '../types';
import { IPaymentStrategy } from './payment-strategy.interface';
import config from 'src/config';

@Injectable()
export class StripeStrategy implements IPaymentStrategy {
  private readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(config.stripe.secretKey);
  }

  async createOrder(amount: number, metadata?: Record<string, any>): Promise<PaymentResponse> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'usd',
        payment_method_types: ['card'],
      });

      return {
        success: true,
        message: 'Stripe payment is being processed',
        data: {
          clientSecret: paymentIntent.client_secret,
        },
      };
    } catch (error) {
      console.error({ error });
      throw new BadRequestException('Payment failed');
    }
  }

  async captureOrder(orderId: string): Promise<PaymentResponse> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.capture(orderId);
      return {
        success: true,
        message: 'Stripe payment captured successfully',
        data: {
          status: paymentIntent.status,
          id: paymentIntent.id,
        },
      };
    } catch (error) {
      console.error({ error });
      throw new BadRequestException('Stripe capture failed');
    }
  }

  config(): PaymentConfigResponse {
    return {
      config: {
        publishableKey: config.stripe.publishableKey,
      },
    };
  }
}
