import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-black p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-white font-semibold text-4xl'>
          Post Card
        </Link>
        <ul className='flex space-x-4'>
          <li>
            <Link
              to='/myFeed'
              className='text-white text-2xl hover:text-red-300'
            >
              My Feed
            </Link>
          </li>
          <li>
            <Link
              to='/myPosts'
              className='text-white text-2xl hover:text-red-300'
            >
              My Posts
            </Link>
          </li>
          <li>
            <Link
              to='/createPost'
              className='text-white text-2xl hover:text-red-300'
            >
              Create Post
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
