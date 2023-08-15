const Navbar = () => {
  return (
    <nav className='bg-black p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-white font-semibold text-4xl'>Post Card</div>
        <ul className='flex space-x-4'>
          <li>
            <a className='text-white hover:text-red-300' href='#'>
              Home
            </a>
          </li>
          <li>
            <a className='text-white hover:text-red-300' href='#'>
              About
            </a>
          </li>
          <li>
            <a className='text-white hover:text-red-300' href='#'>
              Services
            </a>
          </li>
          <li>
            <a className='text-white hover:text-red-300' href='#'>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
