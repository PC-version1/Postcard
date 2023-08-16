import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../../reducers/authslice.js';
import React, { useState } from 'react';
import axios from 'axios'; //import axios library

const Login = () => {
  //add state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //add handle login

  //simulate successful login by creating user obj and dispatching on login action with user data
  //trying to mimic redux toolkit here.
  const handleLogin = async () => {
    const dispatch = useDispatch();
    try {
      //send post req with un/pw
      //if login is successfull parse data from response (pc)
      //dispatch an action to update auth prop in authSlice
      //else
      //login failed
      //display error message to user invalid credentials
      const response = await axios.post('/login', {
        username,
        password,
      });
      if (response.status === 200) {
        const userData = response.data;
        //dispatch to reducer
        dispatch(onLogin(userData));
      }
    } catch (error) {
      console.error('failed login', error);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-blue-100'>
      <div className='bg-gray-300-500 p-8 rounded shadow-md w-96 flex flex-col items-center'>
        <h2 className='text-xl mb-4 font-semibold'>Welcome to PostCard!</h2>
        <h3 className='text-xl mb-4 font-semibold'>Post Your Travels!</h3>
        <form className='login-form'>
          <div className='form-group'>
            <label htmlFor='username' className='block text-sm font-large'>
              Username:
            </label>
            <input
              type='text'
              id='username'
              className='mt-1 p-2 border rounded w-full'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className='form-group mb-4'>
            <label htmlFor='password' className='block text-sm font-large'>
              Password:
            </label>
            <input
              type='password'
              id='password'
              className='mt-1 p-2 border rounded w-full'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button
            type='button'
            className='border border-black-500 bg-black-500 text-black px-4 py-2 rounded hover:bg-blue-600 hover:border-blue-600'
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
