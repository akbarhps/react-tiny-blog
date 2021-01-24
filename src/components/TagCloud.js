import { Link } from "react-router-dom";

const Tags = ({ tags }) => {
  return (
    <div className="tag-cloud">
      <h3>Tags</h3>
      <div>
        {tags && tags.map(tag => (
          <div key={tag}>
            <Link to={`/tags/${tag}`}>#{tag}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tags;