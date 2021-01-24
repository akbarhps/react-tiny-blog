import { Link, useHistory, useParams } from "react-router-dom";
import useFetchData from "../composable/useFetchData";

import Loading from "../components/Loading";
import { useState } from "react";

function BlogDetails() {
  const { id } = useParams();
  const history = useHistory();
  const url = `http://localhost:8000/blogs/${id}`;
  const { data, isLoading, error } = useFetchData(url);
  const [onDeleting, setOnDeleting] = useState(false);

  async function deletePost() {
    try {
      setOnDeleting(true)
      await fetch(url, { method: "DELETE" });
      history.go(-1);
    } catch (err) {
      console.log(err.message);
      setOnDeleting(true)
    }
  }

  function convertMilisToDate() {
    return new Date(data.timestamp).toLocaleString();
  }

  return (
    <div className="post">
      { isLoading &&
        <Loading />
      }
      { error &&
        <div>{error}</div>
      }
      { !isLoading && data &&
        <div>
          <h3>{data.title}</h3>
          <p className="post__author">Posted at {convertMilisToDate()} by {data.author}</p>
          <p>{data.body}</p>
          <br />
          {data.tags.map(tag => (
            <div className="tags" key={tag}>
              <Link to={`/tags/${tag}`}>{tag}</Link>
            </div>
          ))}
          {onDeleting ?
            <button disabled>Deleting Post..</button> :
            <button onClick={deletePost}>Delete Post</button>
          }
        </div>
      }
    </div >
  );
}

export default BlogDetails;