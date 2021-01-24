import { useEffect, useState } from 'react';
import useFetchData from '../composable/useFetchData.js';

import Blog from '../components/Blog';
import Loading from '../components/Loading';
import TagCloud from '../components/TagCloud';

const url = 'http://localhost:8000/blogs';

function Home() {
  const { data, isLoading, error } = useFetchData(url, true);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const tagSet = new Set();

    data.forEach(blog => {
      blog.tags.forEach(tag => tagSet.add(tag));
    });

    setTags([...tagSet]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return (
    <div className="home">
      { error &&
        <h1>{error}</h1>
      }
      { isLoading &&
        <Loading />
      }
      { !isLoading && data &&
        <div className="layout">
          <div className="post-list">
            {data.map(blog => (
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

export default Home;