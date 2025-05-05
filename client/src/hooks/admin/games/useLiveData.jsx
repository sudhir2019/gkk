import { useEffect, useState, useCallback } from 'react';
import api from '../../../utils/axiosInstance';

const useLiveData = (adminId, gameId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!adminId || !gameId) return;

    setLoading(true);
    try {
      const response = await api.get(`/live/livedata?adminId=${adminId}&gameId=${gameId}`);
      setData(response.data);
    } catch (err) {
      console.error("Axios error:", err);
    } finally {
      setLoading(false);
    }
  }, [adminId, gameId]);

  useEffect(() => {
    loadData(); // Initial load
    const intervalId = setInterval(loadData, 1000); // Refresh every second
    return () => clearInterval(intervalId); // Cleanup on unmount or dependency change
  }, [loadData]);

  return {
    data,
    loading,
    reload: loadData
  };
};

export default useLiveData;
