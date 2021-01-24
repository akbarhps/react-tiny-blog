import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>This page is not found</h1>
      <div className="post">
        <Link to="/">
          <button>Back to Homepage</button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;