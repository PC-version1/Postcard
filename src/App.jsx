import Counter from './components/Counter';
import CreatePost from './containers/CreatePost';
import Feed from './containers/Feed';
import MyFeed from './containers/MyFeed';
import MyPosts from './containers/MyPosts';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' Component={Feed} />
          <Route path='/myFeed' Component={MyFeed} />
          <Route path='/myPosts' Component={MyPosts} />
          <Route path='/createPost' Component={CreatePost} />
          {/* <Route path='/login' Component={Login} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
