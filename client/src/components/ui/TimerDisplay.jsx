import React, { useEffect, useRef } from 'react'; // adjust the path as needed
import Audio from '../../assets/games/time.wav'; // adjust the path as needed
const TimerComponent = ({ timer }) => {
    const audioRef = useRef(null);
    const playedRef = useRef(false);

    useEffect(() => {
        console.log('TIMER CHECK:', timer);

        if (timer === 0 && !playedRef.current) {
            console.log('🔊 Attempting to play audio');
            if (audioRef.current) {
                audioRef.current.play().catch((err) => {
                    console.warn('Audio playback failed:', err);
                });
                playedRef.current = true;
            }
        }

        if (timer > 0) {
            playedRef.current = false;
        }
    }, [timer]);


    return (
        <>
            <span className='text-xl mb-2' id="countdown">Timer: {timer}</span>
            <audio ref={audioRef}>
                <source src={Audio} type="audio/mpeg" />
            </audio>
        </>
    );
};

export default TimerComponent;
