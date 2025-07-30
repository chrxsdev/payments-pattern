import { useMemo, useState } from 'react';
import { products } from '../data/data';
import { StripeCard } from '../components/payments/stripe/StripeCard';
import { Paypal } from '../components/payments/paypal/Paypal';

type PaymentMethod = 'card' | 'paypal';

const HomePage = () => {
  const [cart, setCart] = useState(products);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  const amount = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.amount, 0), [cart]);

  const renderPaymentMethod = useMemo(() => {
    return {
      card: <StripeCard products={cart} amount={amount} />,
      paypal: <Paypal products={cart} amount={amount} />,
    };
  }, [cart, amount]);

  const removeProduct = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  if (cart.length === 0) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <h1 className='text-2xl font-bold'>Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div className='my-2'>
      <div className='flex items-center justify-center'>
        <h1 className='font-bold text-2xl text-center'>Payments</h1>
      </div>
      <div className='flex flex-row p-6 items-start justify-center '>
        <div className='flex flex-col w-[70%] p-2 rounded-lg items-center justify-center'>
          <h1 className='font-bold text-2xl mb-4'>Cart</h1>
          <div className='grid grid-cols-3 gap-4'>
            {cart.map((cartItem) => (
              <div key={cartItem.id} className='border-2 border-gray-500 shadow-xl p-2 rounded-lg'>
                <div className='flex justify-center my-2'>
                  <img className='w-50 h-50 object-cover' src={cartItem.img} alt={cartItem.title} />
                </div>
                <div className='flex flex-col gap-y-2'>
                  <h3 className='font-bold text-sm'>{cartItem.title}</h3>
                  <h5 className='font-semibold'>${cartItem.price.toFixed(2)}</h5>
                </div>
                <div className='flex justify-between items-center mt-2'>
                  <span>Quantity: {cartItem.amount}</span>
                  <button
                    onClick={() => removeProduct(cartItem.id)}
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded cursor-pointer'
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col w-[30%] p-4 rounded-lg'>
          <h1 className='font-bold text-2xl mb-4'>Pay with:</h1>

          <div className='flex flex-col gap-y-2'>
            <div>
              <span className='font-bold mb-2 block'>Payment Method</span>
              <div className='flex gap-x-4'>
                <label className='flex items-center gap-x-2'>
                  <input
                    type='radio'
                    name='payment-method'
                    value='card'
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <span>Card</span>
                </label>
                <label className='flex items-center gap-x-2'>
                  <input
                    type='radio'
                    name='payment-method'
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                  />
                  <span>Paypal</span>
                </label>
              </div>
              <div className='py-4'>{renderPaymentMethod[paymentMethod]}</div>
            </div>
            <div>
              <h1 className='font-bold underline'>Total: $ {amount.toFixed(2)}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
