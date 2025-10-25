import { useState, useEffect } from 'react';
import { problemsAPI } from '../api/problems';

export const useProblems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await problemsAPI.getAll();
      setProblems(data.problems || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch problems');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return { problems, loading, error, refetch: fetchProblems };
};

export const useProblem = (id) => {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProblem = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await problemsAPI.getOne(id);
      setProblem(data.problem);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch problem');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProblem();
    }
  }, [id]);

  return { problem, loading, error, refetch: fetchProblem };
};