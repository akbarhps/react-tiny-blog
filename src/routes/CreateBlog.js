import { useState } from "react";
import { useHistory } from "react-router-dom";

const url = 'http://localhost:8000/blogs';

function CreateBlog() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');

  function addTags() {
    const allTags = tags;
    const tag = currentTag.replace(/\s/g, "");
    if (!allTags.includes(tag)) {
      allTags.push(tag);
      setTags(allTags);
    }
    setCurrentTag('');
  }

  function deleteTag(selectedTag) {
    const updatedTags = tags.filter((tag) => {
      return tag !== selectedTag
    })
    setTags(updatedTags);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const blog = {
      author, title,
      body, tags, "timestamp": new Date().getTime()
    };

    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog)
      });
      history.push('/');
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="create-post">
      <form onSubmit={handleSubmit}>
        <label>Author:</label>
        <input
          required
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <label>Title:</label>
        <input
          required
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <label>Content:</label>
        <textarea
          required
          type="text"
          value={body}
          onChange={e => setBody(e.target.value)}
        />

        <label>Tags:</label>
        <input
          type="text"
          value={currentTag}
          placeholder="Press space to add and click tag to delete"
          onChange={e => setCurrentTag(e.target.value)}
          onKeyDownCapture={(e) => {
            if (e.key === " ") {
              addTags();
            }
          }}
        />

        {tags.map(tag => (
          <div
            onClick={(e) => deleteTag(e.target.innerText)}
            key={tag}
            className="tags">{tag}
          </div>
        ))}

        {isLoading ?
          <button disabled>Adding new post...</button> :
          <button>Add Post</button>
        }
      </form>
    </div>
  );
}

export default CreateBlog;