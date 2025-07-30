import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  PayPalButtons,
  PayPalScriptProvider,
  type PayPalButtonsComponentProps,
  type ReactPayPalScriptOptions,
} from '@paypal/react-paypal-js';

import type { Product } from '../../../types/types';
import paymentsApi from '../../../api/paymentsApi';

interface PaypalProps {
  products?: Product[];
  amount: number;
}

export const Paypal = ({ products, amount }: PaypalProps) => {
  const [initialOptions, setInitialOptions] = useState<ReactPayPalScriptOptions>({
    clientId: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaypalConfig = async () => {
      const { data } = await paymentsApi.get('/payments/config', {
        params: {
          paymentMethod: 'paypal',
        },
      });

      if (data.config.clientId) {
        setInitialOptions((prev) => ({
          ...prev,
          clientId: data.config.clientId,
        }));
      }
    };

    fetchPaypalConfig();
  }, []);

  const createOrder = async () => {
    try {
      const { data } = await paymentsApi.post('/payments/pay', {
        paymentMethod: 'paypal',
        amount,
        metadata: { products },
      });

      const orderData = data.data.jsonResponse;

      if (orderData.id) {
        return orderData.id;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onApprove: PayPalButtonsComponentProps['onApprove'] = async (data) => {
    if (!data.orderID) {
      throw new Error('Order ID is not available');
    }

    try {
      const { data: responseData } = await paymentsApi.post(`/payments/capture/${data.orderID}/paypal`, {
        method: 'POST',
      });

      const orderData = responseData.data.jsonResponse;

      if (orderData.status === 'COMPLETED') {
        navigate('/success');
      } else {
        navigate('/error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    initialOptions.clientId && (
      <>
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={{
              layout: 'vertical',
              label: 'paypal',
            }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={(err) => {
              console.error({ err });
              navigate('/error');
            }}
            fundingSource='paypal'
          />
        </PayPalScriptProvider>
      </>
    )
  );
};
