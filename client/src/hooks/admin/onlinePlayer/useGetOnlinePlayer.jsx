// useGetOnlinePlayer.js
import { useDispatch, useSelector } from 'react-redux';
import { fetchronlinePlayer } from '../../../stores/actions/onlinePlayerAction';
import { useEffect } from 'react';

export const useGetOnlinePlayer = () => {
    const dispatch = useDispatch();

    const {
        onlineplayers,
        onlineplayerLoading,
        onlineplayerError,
        onlineplayerMessage,
    } = useSelector((state) => state.onlinePlayer);
    useEffect(() => {
        dispatch(fetchronlinePlayer());
    }, [dispatch]);

    return {
        onlineplayers,
        onlineplayerLoading,
        onlineplayerError,
        onlineplayerMessage
    };
};

