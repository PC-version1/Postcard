import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAllPosts } from '../reducers/postReducer';
import axios from 'axios';
import Post from '../components/Post';
import Navbar from '../components/Navbar';

const MyFeed = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector(state => state.postReducer.allPosts);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        dispatch(setAllPosts(response.data));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <>
    <Navbar />
    <div className="flex">
      <div className="bg-slate-100 w-1/3 p-4 overflow-y-auto border-r border-gray-300 max-h-screen">
        {allPosts.map((post) => (
          <div
            key={post.id}
            className={`cursor-pointer p-2 mb-4 ${
              selectedPost?.id === post.id ? 'bg-gray-200' : ''
            }`}
            onClick={() => handlePostClick(post)}
          >
            <h3 className="text-lg font-semibold">{post.title}</h3>
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
          />
        )}
      </div>
    </div>
    </>
  );
};

export default MyFeed;