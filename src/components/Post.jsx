import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../reducers/authSlice';
// import { onLogin } from '../reducers/authSlice.js';

const Post = ({ title, content, author, date }) => {
  return (
    // <div className="bg-white shadow-md rounded-lg p-6">
    //   <h2 className="text-2xl font-semibold mb-2">title</h2>
    //   <p className="text-gray-600 mb-2">By author</p>
    //   <p className="text-gray-600 mb-2">date</p>
    //   <div className="prose">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci quo, eum est nisi obcaecati officiis molestias neque in, quidem recusandae laudantium beatae dolore! Deleniti dolores vel pariatur sequi distinctio eos.e</div>
    // </div>
    <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200'>
      <h2 className='text-3xl font-semibold mb-4 text-gray-800'>{title}</h2>
      <p className='text-gray-600 mb-2'>By {author}</p>
      <p className='text-gray-600 mb-4'>{date}</p>
      <div className='text-gray-800'>{content}</div>
    </div>
  );
};

export default Post;
