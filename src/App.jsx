import CreatePost from './containers/CreatePost';
import Feed from './containers/Feed';
import MyFeed from './containers/MyFeed';
import MyPosts from './containers/MyPosts';
import Login from './components/Login';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Signup from './components/Signup';

function App() {
  const user = useSelector((state) => state.auth.user);
  console.log('user: ', user);
  const PrivateRoute = ({ element }) => {
    if (user) {
      console.log('user exists, rendering component');
      return element;
    } else {
      return <Navigate to='/login' />;
    }
  };

  const handleSignup = () => {
    return <Navigate to='/signup' />;
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login signup={handleSignup} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<PrivateRoute element={<Feed />} />} />
          <Route
            path='/myFeed'
            element={<PrivateRoute element={<MyFeed />} />}
          />
          <Route
            path='/myPosts'
            element={<PrivateRoute element={<MyPosts />} />}
          />
          <Route
            path='/createPost'
            element={<PrivateRoute element={<CreatePost />} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
