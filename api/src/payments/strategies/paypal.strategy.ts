import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ApiError, Client, Environment, OrdersController, CheckoutPaymentIntent } from '@paypal/paypal-server-sdk';
import { PaymentConfigResponse, PaymentResponse } from '../types';
import { IPaymentStrategy } from './payment-strategy.interface';
import config from 'src/config';

@Injectable()
export class PaypalStrategy implements IPaymentStrategy {
  private readonly client: Client;
  private readonly ordersController: OrdersController;

  constructor() {
    this.client = new Client({
      clientCredentialsAuthCredentials: {
        oAuthClientId: config.paypal.clientId,
        oAuthClientSecret: config.paypal.secret,
      },
      environment: config.environment === 'production' ? Environment.Production : Environment.Sandbox,
    });
    this.ordersController = new OrdersController(this.client);
  }

  async createOrder(amount: number, metadata?: Record<string, any>): Promise<PaymentResponse> {
    if (!amount || amount <= 0) {
      throw new BadRequestException('Invalid payment amount.');
    }
    try {
      const items = this.prepareItems(metadata);
      const { body, ...httpResponse } = await this.ordersController.createOrder({
        body: {
          intent: CheckoutPaymentIntent.Capture,
          purchaseUnits: [
            {
              amount: {
                currencyCode: 'USD',
                value: amount.toFixed(2),
                breakdown: {
                  itemTotal: {
                    currencyCode: 'USD',
                    value: amount.toFixed(2),
                  },
                },
              },
              items,
            },
          ],
        },
        prefer: 'return=minimal',
      });

      return {
        success: true,
        message: 'Paypal processed successfully',
        data: {
          jsonResponse: typeof body === 'string' ? JSON.parse(body) : body,
          httpStatusCode: httpResponse.statusCode,
        },
      };
    } catch (error) {
      let errorMessage = 'An error occurred while processing the payment with Paypal.';
      if (error instanceof ApiError) {
        errorMessage = `Paypal API Error: ${error.message}`;
      }
      console.error({ error });
      throw new InternalServerErrorException(errorMessage);
    }
  }

  async captureOrder(orderId: string): Promise<PaymentResponse> {
    if (!orderId) {
      throw new BadRequestException('Order ID is required.');
    }
    try {
      const { body, ...httpResponse } = await this.ordersController.captureOrder({
        id: orderId,
        prefer: 'return=minimal',
      });

      return {
        success: true,
        message: 'Paypal order captured successfully',
        data: {
          jsonResponse: typeof body === 'string' ? JSON.parse(body) : body,
          httpStatusCode: httpResponse.statusCode,
        },
      };
    } catch (error) {
      let errorMessage = 'An error occurred while capturing the Paypal order.';
      if (error instanceof ApiError) {
        errorMessage = `Paypal API Error: ${error.message}`;
      }
      console.error({ error });
      throw new InternalServerErrorException(errorMessage);
    }
  }

  config(): PaymentConfigResponse {
    return {
      config: {
        clientId: config.paypal.clientId,
      },
    };
  }

  private prepareItems(metadata?: Record<string, any>): Array<any> {
    return (
      metadata?.products.map((product) => ({
        name: product.title,
        unitAmount: {
          currencyCode: 'USD',
          value: product.price.toFixed(2),
        },
        quantity: product.amount.toString(),
      })) || []
    );
  }
}
