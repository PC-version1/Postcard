import Counter from './components/Counter';
import CreatePost from './components/CreatePost';
import Feed from './components/Feed';
import MyFeed from './components/MyFeed';
import MyPosts from './components/MyPosts';
import Navbar from './components/Navbar';
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
