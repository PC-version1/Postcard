import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInterestPosts } from '../reducers/postReducer';
import Post from '../components/Post';
import Navbar from '../components/Navbar';
import axios from 'axios';

const MyFeed = () => {
  const dispatch = useDispatch();
  const interestPosts = useSelector(state => state.postReducer.interestPosts);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {  // Define an asynchronous function
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        dispatch(setInterestPosts(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();  // Immediately invoke the function to fetch data
  }, []);  // Empty dependency array to run the effect only once

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };
  return (
    <>
    <Navbar />
    <div className="flex">
      <div className="bg-slate-100 w-1/3 p-4 overflow-y-auto border-r border-gray-300 max-h-screen">
        {interestPosts.map((post) => (
          <div
            key={post.id}
            className={`cursor-pointer p-2 mb-4 ${
              selectedPost?.id === post.id ? 'bg-gray-200' : ''
            }`}
            onClick={() => handlePostClick(post)}
          >
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-gray-600 truncate">-{post.author}</p>
            <p className="text-gray-600 truncate">{post.body}</p>
          </div>
        ))}
      </div>
      <div className="w-2/3 p-4 bg-gray-100 fixed right-0">
        {selectedPost && (
          <Post className=''
            title={selectedPost.title}
            author="Author Name"
            date="July 15, 2023"
            content={selectedPost.body}
            tags={selectedPost.tags}
          />
        )}
      </div>
    </div>
    </>
  );
};

export default MyFeed;