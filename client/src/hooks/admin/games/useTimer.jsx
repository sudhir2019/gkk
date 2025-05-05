import { useEffect, useRef, useState } from 'react';
import socket from '../../../utils/socketinstance';

const useTimer = (adminId, gameId) => {
  const [timer, setTimer] = useState(null);
  const hasEmitted = useRef(false);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    if (!hasEmitted.current) {
      socket.emit('timerData', { adminId, gameId });
      hasEmitted.current = true;
    }

    const handleTimer = (data) => {
      // console.log(data);
      if (data?.gameId === gameId) {
       
        setTimer(data.time); // update only this game's timer
      }
    };

    socket.on('timer', handleTimer);

    return () => {
      socket.off('timer', handleTimer);
      hasEmitted.current = false;
    };
  }, [adminId, gameId]);

  return timer;
};

export default useTimer;
