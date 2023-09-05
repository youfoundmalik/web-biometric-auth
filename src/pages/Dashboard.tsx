import { useContext } from 'react';
import { StoreContext } from '../App';

import success from '../assets/success.png';

const Dashboard = () => {
  const { user } = useContext(StoreContext);
  return (
    <section className='w-screen h-screen flex flex-col items-center justify-center'>
      <div className='border border-black bg-[#f7f7f7] border-opacity-20 px-2 py-10 md:px-5 rounded-md w-[90%] m-3 md:w-2/3 text-center lg:w-1/2'>
        <div className='w-[70%] md:w-[50%] mx-auto md:mb-3 mb-2'>
          <img alt='authenticate' src={success} />
        </div>
        <p className='text-base md:text-[18px] font-[500] mb-1'>
          Login successful
        </p>
        <p className='inline-block text-lg md:text-[20px] font-bold text-teal-700'>
          {user?.email}
        </p>
      </div>
    </section>
  );
};

export default Dashboard;
