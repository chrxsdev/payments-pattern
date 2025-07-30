import { Link } from 'react-router';

const SuccessPage = () => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='bg-green-400 p-8 rounded-lg text-center shadow-lg'>
        <h1 className='text-white font-bold text-2xl'>Payment Successful</h1>
        <p className='mb-4'>Your payment has been processed successfully. 🎉</p>
        <Link className='text-white hover:text-gray-100' to="/">Go back</Link>
      </div>
    </div>
  );
};

export default SuccessPage;
