import { useState, useEffect } from 'react';
import { problemsAPI } from '../api/problems';

const useSolutions = (problemId) => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSolutions = async () => {
    if (!problemId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await problemsAPI.getSolutions(problemId);
      setSolutions(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch solutions');
      console.error('Error fetching solutions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, [problemId]);

  const refetch = () => {
    fetchSolutions();
  };

  return { solutions, loading, error, refetch };
};

export default useSolutions;