import { Link } from 'react-router-dom';

function Blog({ blog }) {
  function getSubstring(string, length) {
    return string.substring(0, length);
  }

  function getTitleSnippets() {
    let title = getSubstring(blog.title, 20);
    if (blog.title.length > 20) {
      title += '...';
    }
    return title;
  }

  function getAuthorSnippets() {
    let author = getSubstring(blog.author, 10);
    if (blog.author.length > 10) {
      author += '...';
    }
    return author;
  }

  function getBodySnippets() {
    let body = getSubstring(blog.body, 100);
    if (blog.body.length > 10) {
      body += '...';
    }
    return body;
  }

  function convertMilisToDate() {
    return new Date(blog.timestamp).toLocaleString();
  }

  return (
    <div className="post" key={blog.id}>
      <Link to={`/posts/${blog.id}`}>
        <h3>{getTitleSnippets()}</h3>
        <p className="post__author">Posted {convertMilisToDate()} by {getAuthorSnippets()}</p>
        <p className="post__snippets">{getBodySnippets()}</p>
      </Link>
      <br />
      {blog.tags.map(tag => (
        <div className="tags" key={tag}>
          <Link to={`/tags/${tag}`}>{tag}</Link>
        </div>
      ))}
    </div>
  );
}

export default Blog;