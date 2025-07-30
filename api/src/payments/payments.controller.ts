import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  /**
   * Endpoint to create a payment
   * @param createPaymentDto - DTO containing payment details
   * @returns Payment response
   */
  @Post('pay')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.processPayment(createPaymentDto);
  }

  /**
   * Endpoint to capture a payment
   * @param orderId - ID of the order to capture
   * @param paymentMethod - Payment method used for the order
   * @returns Payment response
   */
  @Post('capture/:orderId/:paymentMethod')
  async capturePayment(@Param('orderId') orderId: string, @Param('paymentMethod') paymentMethod: string) {
    return this.paymentsService.capturePayment(orderId, paymentMethod);
  }

  /**
   * Endpoint to get payment configuration
   * @param paymentMethod - Payment method to get config for
   * @returns Payment config response
   */
  @Get('config')
  async getPaymentConfig(@Query('paymentMethod') paymentMethod: string) {
    return this.paymentsService.getPaymentConfig(paymentMethod);
  }
}
