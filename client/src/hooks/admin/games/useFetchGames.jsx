import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { fetchGames } from "../../../stores/actions/gameActions";
import { clearGamesError, clearGamesMessage } from "../../../stores/slices/gameSlice";

/**
 * Hook for managing games fetching and related states
 * @returns {Object} Games data and management functions
 */
export const useFetchGames = () => {
    const dispatch = useDispatch();

    // Get necessary state from Redux
    const { games, gamesLoading, gamesError, gamesMessage } = useSelector((state) => state.games);
   // const { isAuthenticated } = useSelector((state) => state.auth); // Assuming your auth state has 'isAuthenticated'

    // Auto-clear messages/errors after 5 seconds
    useEffect(() => {
        let timeoutId;
        if (gamesError || gamesMessage) {
            timeoutId = setTimeout(() => {
                if (gamesError) dispatch(clearGamesError());
                if (gamesMessage) dispatch(clearGamesMessage());
            }, 5000);
        }
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [gamesError, gamesMessage, dispatch]);

    // Function to fetch all games
    const fetchAllGames = useCallback(async () => {
        try {
            await dispatch(fetchGames()).unwrap(); // Dispatch the async fetchGames action
            return true;
        } catch (error) {
            console.error("Error fetching games:", error?.message || error);
            dispatch(clearGamesError());  // Optionally clear any existing error
            return false;
        }
    }, [dispatch]);

    // Clear error manually
    const clearError = useCallback(() => {
        dispatch(clearGamesError());
    }, [dispatch]);

    // Clear message manually
    const clearMessage = useCallback(() => {
        dispatch(clearGamesMessage());
    }, [dispatch]);

    return {
        games,
        gamesLoading,
        gamesError,
        gamesMessage,
        fetchAllGames,
        clearError,
        clearMessage,
    };
};
