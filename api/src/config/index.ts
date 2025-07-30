import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const config = {
  port: process.env.PORT ?? 3000,
  environment: process.env.NODE_ENV ?? 'development',
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID ?? '',
    secret: process.env.PAYPAL_SECRET ?? '',
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY ?? '',
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY ?? '',
  },
};

export default config;
