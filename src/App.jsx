import Counter from './components/Counter';
import CreatePost from './components/CreatePost.jsx';
import Feed from './components/Feed.jsx';
import MyFeed from './components/MyFeed.jsx';
import MyPosts from './components/MyPosts.jsx';
import Navbar from './components/Navbar.jsx';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/Login.jsx';
function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          {/* <Route path='/' Component={Feed} />
          <Route path='/myFeed' Component={MyFeed} />
          <Route path='/myPosts' Component={MyPosts} />
          <Route path='/createPost' Component={CreatePost} /> */}
          <Route path='/login' Component={Login} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
