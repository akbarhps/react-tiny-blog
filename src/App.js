import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './routes/Home';
import CreateBlog from './routes/CreateBlog';
import BlogDetails from './routes/BlogDetails';
import PostsByTag from './routes/PostsByTag';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <CreateBlog />
            </Route>
            <Route path="/posts/:id">
              <BlogDetails />
            </Route>
            <Route path="/tags/:tag">
              <PostsByTag />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
