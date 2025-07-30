import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PAYMENT_PROVIDERS } from './payment.providers';
import { PaymentStrategyFactory } from './factory/payment-strategy.factory';
import { PaymentStrategyRegistry } from './registry/payment-register.registry';
import { PaymentsService } from './payments.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentStrategyFactory, PaymentStrategyRegistry, ...PAYMENT_PROVIDERS],
  exports: [PaymentStrategyFactory],
})
export class PaymentsModule {}
