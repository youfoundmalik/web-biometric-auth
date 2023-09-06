import { SyntheticEvent, useContext, useRef, useState } from 'react';
import { client } from '@passwordless-id/webauthn';
import { Button } from '@chakra-ui/react';
import { StoreContext } from '../App';

import icon from '../assets/icon.png';

const Auth = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { setUser } = useContext(StoreContext);

  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    await client.isLocalAuthenticator();

    const challenge = '56535b13-5d93-4194-a282-f234c1c24500';

    try {
      // setTimeout(() => {
      //   setUser?.({ email, password });
      // }, 10000);
      await client.authenticate(
        ['3924HhJdJMy_svnUowT8eoXrOOO6NLP8SK85q2RPxdU'],
        challenge,
        {
          authenticatorType: 'local',
          userVerification: 'required',
          timeout: 60000,
        }
      );
      setIsLoading(false);
      setUser?.({ email, password });
    } catch (error) {
      console.log(11, error);
      setIsLoading(false);
      setUser?.({ email, password });
    }
  };

  return (
    <section className='w-screen h-screen flex items-center justify-center'>
      <div className='border border-black border-opacity-20 px-2 py-7 md:px-5 md:py-7 rounded-md w-full m-3 md:w-1/2 lg:w-1/3'>
        <div className='w-[20%] mb-3'>
          <img alt='authenticate' src={icon} />
        </div>
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
          <Button
            type='submit'
            isLoading={isLoading}
            loadingText='Submitting'
            colorScheme='teal'
            size='lg'
            className='h-[50px] w-full mt-5 rounded outline-none'
          >
            Sign In
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Auth;
