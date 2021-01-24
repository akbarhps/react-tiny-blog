import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchData from "../composable/useFetchData";

import Blog from '../components/Blog';
import Loading from '../components/Loading';
import TagCloud from '../components/TagCloud';

const url = 'http://localhost:8000/blogs';

const PostsByTag = () => {
  const { tag } = useParams();
  const { data, isLoading, error } = useFetchData(url, true);
  const [tags, setTags] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const tagSet = new Set();
    const filteredBlogs = [];

    data.forEach(blog => {
      blog.tags.forEach(tag => tagSet.add(tag));
      if (blog.tags.includes(tag)) {
        filteredBlogs.push(blog);
      }
    });

    setTags([...tagSet]);
    setFilteredPosts(filteredBlogs);
  }, [tag, isLoading, data])

  return (
    <div className="home">
      { error &&
        <h1>{error}</h1>
      }
      { isLoading &&
        <Loading />
      }
      { !isLoading && filteredPosts &&
        <div className="layout">
          <div className="post-list">
            {filteredPosts.map(blog => (
              <Blog
                key={blog.id}
                blog={blog} />
            ))}
          </div>
          <TagCloud tags={tags} />
        </div>
      }
    </div>
  );
}

export default PostsByTag;