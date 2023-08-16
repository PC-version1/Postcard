//imports
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import logoImage from '/Users/noelpallivathucal/Desktop/Codesmith/Postcard/build/assets/postcardlogo.jpg';
//declare signup component and add states
const SignUpPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  //declare dispatch variable which will create action to be sent to reducer(toolkit automatically creates action when sees dispatch fxn)
  //reducers-pure functions, take current state and dispatched actions as inputs
  //returns new state. new state is updated in redux store causes components connected to it to
  //re render with updated data.
  const dispatch = useDispatch();

  //add handle signUp here executed when sign up button clicked/invoked in component
  const handleSignUp = () => {
    //destructuring vars into userData obj
    const userData = { name, username, email, password };
    //dispatch signUpSuccess action from Redux Store
    ///userData is payload of action - this is whats used to update state of redux store
    //after dispatching actions reset state variables for next sign in attempt
    dispatch(signUpSuccess(userData));
    //reset state variables for input fields
    setName('');
    setUsername('');
    setEmail('');
    setPassword('');
  };
  return (
    <div className='flex items-center justify-center h-screen bg-blue-100'>
      <div className='bg-gray-300-500 p-8 rounded shadow-md w-96 flex flex-col items-center'>
        <img src={logoImage} alt='Logo' className='mx-auto mb-4' />
        <h2 className='text-xl mb-4 font-semibold'>Sign Up to Post A Card!</h2>
        <form className='flex flex-col'>
          <label>Name:</label>
          <input
            type='text'
            //mb margin bottom creates space between elem an next one
            //p-2 adds padding 2 units to all sides of input (took out) field
            //put a rounded border ard all input fields
            //w-full set width of element to 100% of containing elements width

            className='mb-4 border rounded w-full'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Username:</label>
          <input
            type='text'
            className='mb-4 border rounded w-full'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password:</label>
          <input
            type='text'
            className='mb-4 border rounded w-full'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Email:</label>
          <input
            type='text'
            className='mb-4 border rounded w-full'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* add sign up button   */}
          <button
            type='button'
            className='self-center border border-black-500 bg-black-500 text-black px-4 py-2 rounded hover:bg-blue-600 hover:border-blue-600'
            onClick={handleSignUp}
          >
            Sign Up!
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUpPage;
