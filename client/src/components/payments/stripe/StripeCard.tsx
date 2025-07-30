import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';

import { CheckoutForm } from './CheckoutForm';
import type { Product } from '../../../types/types';
import { loadStripe, type Stripe } from '@stripe/stripe-js';
import paymentsApi from '../../../api/paymentsApi';

interface StripeCardProps {
  products?: Product[];
  amount: number;
}

export const StripeCard = ({ products, amount }: StripeCardProps) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    const fetchStripeConfig = async () => {
      const { data } = await paymentsApi.get('/payments/config', {
        params: {
          paymentMethod: 'stripe',
        },
      });

      const stripeObj = await loadStripe(data.config.publishableKey);
      setStripe(stripeObj);
    };

    fetchStripeConfig();
  }, []);

  return (
    <>
      {stripe && (
        <Elements stripe={stripe}>
          <CheckoutForm products={products} amount={amount} />
        </Elements>
      )}
    </>
  );
};
