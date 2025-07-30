import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { Product } from '../../../types/types';
import paymentsApi from '../../../api/paymentsApi';


interface CheckoutFormProps {
  products?: Product[];
  amount: number;
}

export const CheckoutForm = ({ amount }: CheckoutFormProps) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    setIsProcessing(true);
    const { data } = await paymentsApi.post('/payments/pay', {
      paymentMethod: 'stripe',
      amount,
    });

    if (!stripe || !elements) {
      setMessage('Elements not loaded yet.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setMessage('Card element not found.');
      return;
    }

    const result = await stripe.confirmCardPayment(data.data.clientSecret, {
      payment_method: {
        card: cardElement,
      }
    });
    
    setIsProcessing(false);
    
    if (result.error) {
      setMessage(result.error.message ?? 'An unknown error occurred.');
      return;
    }
    
    if (result.paymentIntent.status === 'succeeded') {
      navigate('/success');
    }
  };

  return (
    <div inert={false}>
      <CardElement
        className='border-2 border-gray-50 p-4'
        options={{
          disableLink: true,
          hidePostalCode: true,
        }}
      />
      <button
        className={`bg-green-600 hover:bg-green-400 cursor-pointer w-full rounded-sm p-2 text-white my-4 ${
          isProcessing ? 'opacity-50' : ''
        }`}
        onClick={handleSubmit}
        disabled={!stripe}
      >
        {isProcessing ? 'Processing...' : 'Pay with card'}
      </button>
      <p className='font-bold text-red-500'>{message}</p>
    </div>
  );
};
