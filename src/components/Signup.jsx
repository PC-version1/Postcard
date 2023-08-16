import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../reducers/userReducer';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
const [username, setUsername] = useState('');

  const loginStatus = useSelector((state) => state.userReducer.isAuthenticated);

  //declare dispatch variable which will create action to be sent to reducer(toolkit automatically creates action when sees dispatch fxn)
  //reducers-pure functions, take current state and dispatched actions as inputs
  //returns new state. new state is updated in redux store causes components connected to it to
  //re render with updated data.
  const dispatch = useDispatch();

  //add handle signUp here executed when sign up button clicked/invoked in component
  const handleSignup = () => {
    //destructuring vars into userData obj
    const userData = { name, username, email, password };
    //dispatch signUpSuccess action from Redux Store
    ///userData is payload of action - this is whats used to update state of redux store
    dispatch(signUpSuccess(userData));
    //after dispatching actions reset state variables for next sign in attempt
    setName('');
    setUsername('');
    setEmail('');
    setPassword('');
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
          <h2 className='text-2xl font-semibold mb-4'>Sign Up to Post A Card!</h2>
          <input
            type='text'
            placeholder='Name'
            className='w-full p-2 mb-2 border rounded'
            value={name}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <input
            type='text'
            placeholder='Email'
            className='w-full p-2 mb-4 border rounded'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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



