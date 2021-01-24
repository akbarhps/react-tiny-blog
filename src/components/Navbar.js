import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <h1>Tiny blog</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">Create Post</Link>
      </div>
    </header>
  );
}

export default Navbar;