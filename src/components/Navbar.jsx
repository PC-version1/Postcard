import { Link } from 'react-router-dom';

// render signup component
function renderSignUpPage() {
  render();
}

const Navbar = () => {
  return (
    <nav className='bg-teal-400 p-4 sticky top-0'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-white font-semibold text-5xl hover:text-cyan-700'>
          Post Card
        </Link>
        <ul className='flex space-x-4'>
          <li>
            <Link
              to='/myFeed'
              className='text-white text-2xl hover:text-cyan-700'
            >
              My Feed
            </Link>
          </li>
          <li>
            <Link
              to='/myPosts'
              className='text-white text-2xl hover:text-cyan-700'
            >
              My Posts
            </Link>
          </li>
          <li>
            <Link
              to='/createPost'
              className='text-white text-2xl hover:text-cyan-700'
            >
              Create Post
            </Link>
          </li>
        </ul>
        <button
              className="bg-cyan-700 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-full"
              // onClick={handleLogout}
            >
              Logout
            </button>
      </div>

    </nav>
  );
};
export default Navbar;
