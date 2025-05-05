import { useEffect, useState, useCallback } from 'react';
import socket from '../../../utils/socketinstance';

const useGameData = (adminId, gameId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Emit game data for the current gameId and adminId
  const emitGameData = useCallback(() => {
    if (!socket.connected) {
      socket.connect();  // Reconnect to the socket server
    }

    if (adminId && gameId) {
      setData(null);  // Reset previous data
      setLoading(true);  // Set loading state to true
      socket.emit('gameData', { adminId, gameId });  // Emit the new request
    }
  }, [adminId, gameId]);  // Dependencies: Run when gameId or adminId changes

  useEffect(() => {
    const handleResponse = (response) => {
      setData(response);  // Update the state with the new data
      setLoading(false);  // Set loading to false once data is received
    };

    emitGameData();  // Trigger fresh fetch when gameId or adminId changes
    socket.on('responseData', handleResponse);  // Set up the socket listener for response

    return () => {
      socket.off('responseData', handleResponse);  // Clean up socket listener on component unmount or when dependencies change
    };
  }, [gameId, adminId, emitGameData]);  // Re-run useEffect when gameId or adminId changes

  return { data, loading, reload: emitGameData };  // Return the game data, loading state, and reload function
};

export default useGameData;
