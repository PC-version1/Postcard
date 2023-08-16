import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsersPosts, getPostsStatus, getPostsError, fetchUserPosts} from '../../reducers/postsSlice';

const MyPosts = () => {
  const dispatch = useDispatch();
  const userPosts = useSelector(selectUsersPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    // if (postsStatus === 'idle') {
      dispatch(fetchUserPosts());
      console.log(userPosts)
    // }
  }, [postsStatus, dispatch]);

  return (
    <div>
      {userPosts.map((post) => (
        <div key={post.id}>
           <div className='text-4xl'>{post.name}</div>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;