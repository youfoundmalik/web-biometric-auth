import { SyntheticEvent, useRef, useState } from 'react';
import '@passageidentity/passage-auth';

const Auth = () => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(email, password);
  };

  return (
    <section className='w-screen h-screen flex items-center justify-center'>
      <div className='border border-black border-opacity-20 px-2 py-5 md:px-5 md:py-7 rounded-md w-full m-3 md:w-1/2 lg:w-1/3'>
        <h3 className='font-bold text-[30px]'>Welcome!</h3>
        <p>Please enter your login credentials to continue</p>
        <form
          onSubmit={handleSubmit}
          className='mt-5 flex flex-col gap-5 w-full'
        >
          <div className='email-input flex flex-col w-full gap-1'>
            <label htmlFor='email' className='text-xs'>
              Email
            </label>
            <input
              id='email'
              name='email'
              ref={emailRef}
              type='email'
              required
              className='w-full border h-[45px] rounded px-3 outline-none focus:border-cyan-300'
            />
          </div>
          <div className='password-input flex flex-col w-full gap-1'>
            <label htmlFor='password' className='text-xs'>
              Password
            </label>
            <div
              className={`password-box flex items-center gap-3 w-full border h-[45px] rounded px-3 justify-between relative ${
                active ? 'border-cyan-300' : ''
              }`}
            >
              <input
                id='password'
                name='password'
                ref={passwordRef}
                type={show ? 'text' : 'password'}
                required
                className='outline-none flex-grow'
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
              />
              {show ? (
                <p
                  className='text-cyan-500 text-sm cursor-pointer'
                  onClick={() => setShow(false)}
                >
                  hide
                </p>
              ) : (
                <p
                  className='text-cyan-500 text-sm cursor-pointer'
                  onClick={() => setShow(true)}
                >
                  show
                </p>
              )}
            </div>
          </div>
          <button
            type='submit'
            className='h-[50px] w-full mt-5 border-none bg-cyan-600 rounded text-white'
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
};

export default Auth;
