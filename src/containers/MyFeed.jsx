import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectInterestPosts, getPostsStatus, getPostsError, fetchInterestPosts} from '../../reducers/postsSlice';

const MyFeed = () => {
  const dispatch = useDispatch();
  const interestPosts = useSelector(selectInterestPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    // if (postsStatus === 'idle') {
      dispatch(fetchInterestPosts());
    // }
  });

  return (
    <div>
      {interestPosts.map((post) => (
        <div key={post.id}>
           <div className='text-4xl'>{post.name}</div>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default MyFeed;