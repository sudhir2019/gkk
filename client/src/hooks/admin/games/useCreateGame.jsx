import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { createGame } from "../../../stores/actions/gameActions";
import { clearGamesError, clearGamesMessage } from "../../../stores/slices/gameSlice";
import { useForm } from "react-hook-form";
import { fetchTimes } from "../../../stores/actions/gameActions";

/**
 * Hook for managing game creation and related states with file upload functionality.
 * @returns {Object} Game creation functions and states
 */
export const useCreateGame = () => {
    const { authUser } = useSelector((state) => state.auth);
    const { times } = useSelector((state) => state.times); // Fetching times from the store
    const dispatch = useDispatch();
    const { gamesLoading, gamesError, gamesMessage } = useSelector((state) => state.games);

    // Manage file state for file inputs
    const [medias, setMedias] = useState([]);

    useEffect(() => {
        if (!times.length) {
            dispatch(fetchTimes());
        }
    }, [dispatch, times.length]);
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            gameName: "",
            gameDescription: "",
            releaseDate: "",
            publisher: authUser?.username || "",
            nodigit: 0,
            gameStatus: "active",
            label: "no",
            timeId: times[0]?._id || "",
        },
    });

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

    // Fetch times on mount if not already fetched


    const handleFileChange = (index, e) => {
        const selectedFile = e.target.files[0]; // Get the first file selected
        if (selectedFile) {
            setMedias((prevMedias) => {
                const updatedMedias = [...prevMedias]; // Make a copy of the current state
                updatedMedias[index] = selectedFile; // Replace or set the file at the specific index
                return updatedMedias;
            });
        }
    };
    // Handle form submission with file append
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            // Append non-file data to FormData
            formData.append("gameName", data.gameName);
            formData.append("gameDescription", data.gameDescription);
            formData.append("releaseDate", data.releaseDate);
            formData.append("publisher", data.publisher);
            formData.append("nodigit", data.nodigit);
            formData.append("gameStatus", data.gameStatus);
            formData.append("label", data.label);
            formData.append("timeId", data.timeId);
            // Append files only if label is "yes" and files are selected

            if (data.label === "yes" && medias.length > 0) {
                medias.forEach((file) => {
                    formData.append("images", file); // Append each file individually
                });
            }

            // Dispatch createGame action with the form data
            await dispatch(createGame(formData)).unwrap();
            // Reset form and navigate back after successful submission
            reset();
            setTimeout(() => {
                window.history.back();
            }, 1000);
        } catch (error) {
            console.error("Error creating game:", error?.message || error);
        }
    };

    // Clear error messages
    const clearError = useCallback(() => {
        dispatch(clearGamesError());
    }, [dispatch]);

    // Clear success messages
    const clearMessage = useCallback(() => {
        dispatch(clearGamesMessage());
    }, [dispatch]);

    return {
        gamesLoading,
        gamesError,
        gamesMessage,
        clearError,
        clearMessage,
        onSubmit,
        register,
        handleSubmit,
        setValue,
        reset,
        errors,
        times, // Times data from the store
        watch,
        handleFileChange, // Function for handling file changes
        medias, // State for storing files
        setMedias
    };
};
