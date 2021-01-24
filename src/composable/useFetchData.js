import { useState, useEffect } from 'react';

function useFetchData(url, isSorted = false) {
  const controller = new AbortController();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) {
        throw Error('Error while fetching data from server.')
      }

      const data = await res.json();

      if (isSorted) {
        data.sort((a, b) => {
          let da = new Date(a.timestamp),
            db = new Date(b.timestamp);
          return db - da;
        })
      }

      setData(data);
      setError(null);
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log(err.message);
      } else {
        setError(err.message);
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchData();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, setData, isLoading, error };
}

export default useFetchData;