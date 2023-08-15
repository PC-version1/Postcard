import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts} from '../../reducers/postsSlice';

const Feed = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <div className='text-4xl'>{post.title}</div>
          <p>{post.body}</p>
          <p>Author: {post.userId}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;