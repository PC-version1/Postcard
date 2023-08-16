import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { onLogin } from '../reducers/authSlice';
import axios from 'axios';
import { useNavigate, redirect } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.isAuthenticated);
  // const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // send post request to login
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });

      if (response.status === 200) {
        const userData = response.data;
        console.log(userData);
        //dispatch to reducer
        dispatch(onLogin(userData));
        //navigate to the homepage(feed) after successful login
        // redirect('/');
        navigate('/');
      }
    } catch (error) {
      console.error('failed login', error);
    }
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
          <h2 className='text-xl mb-4 font-semibold'>Welcome to PostCard!</h2>
          <h3 className='text-xl mb-4 font-semibold'>Post Your Travels!</h3>
          <h2 className='text-2xl font-semibold mb-4'>Login</h2>
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
            onClick={handleLogin}
            className='w-full bg-blue-500 text-white p-2 my-3 rounded hover:bg-blue-800'
          >
            LOGIN
          </button>
          <Link to='/signup'>
            <button className='w-full bg-cyan-500 text-white p-2 rounded hover:bg-blue-600'>
              SIGN UP
            </button>
          </Link>
          {loginStatus === 'failed' && (
            <p className='text-red-500 mt-2'>Incorrect username or password</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
