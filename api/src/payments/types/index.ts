export interface PaymentResponse {
  success: boolean;
  message?: string;
  data?: Record<string, any>;
}

export interface PaymentConfigResponse {
  config: Record<string, any>;
}