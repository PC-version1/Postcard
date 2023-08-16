import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../reducers/userReducer';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.userReducer.isAuthenticated);

  const handleSignup = () => {
    // Dispatch the login action
    // dispatch(onLogin({ username, password }));
  };

  return (
    <>
      <nav className='bg-teal-400 p-4 sticky top-0'>
        <div className='container mx-auto flex justify-center items-center'>
          <div className='text-white font-semibold text-5xl hover:text-cyan-700'>
            Post Card
          </div>
        </div>
      </nav>

      <div className='flex justify-center items-center h-screen'>
        <div className='w-1/4 h-1/2 p-8 bg-slate-100 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold mb-4'>Sign Up</h2>
          <input
            type='text'
            placeholder='Username'
            className='w-full p-2 mb-2 border rounded'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            className='w-full p-2 mb-4 border rounded'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleSignup}
            className='w-full bg-blue-500 text-white p-2 my-3 rounded hover:bg-blue-800'
          >SIGN UP
          </button>       
          <Link to='/login'><button className='w-full bg-cyan-500 text-white p-2 rounded hover:bg-blue-600'>BACK TO LOGIN</button></ Link >   
        </div>
      </div>
    </>
  );
};

export default Signup;



