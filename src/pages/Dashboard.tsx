import { useContext } from 'react';
import { StoreContext } from '../App';

import success from '../assets/success.png';

const Dashboard = () => {
  const { user } = useContext(StoreContext);
  return (
    <section className='w-screen h-screen flex flex-col items-center justify-center'>
      <div className='border border-black border-opacity-20 px-2 py-10 md:px-5 rounded-md w-full m-3 md:w-2/3 text-center lg:w-1/2'>
        <div className='w-[70%] mb-5'>
          <img alt='authenticate' src={success} />
        </div>
        <p className='text-base'>
          Login to{' '}
          <span className='inline-block text-lg font-bold text-teal-700'>
            {user?.email}
          </span>{' '}
          successful
        </p>
      </div>
    </section>
  );
};

export default Dashboard;
