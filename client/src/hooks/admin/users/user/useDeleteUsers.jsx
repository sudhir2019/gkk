import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState, useEffect } from "react";
import { deleteusers } from "../../../../stores/actions/userAction";

const useDeleteusers = (closeModal) => {
    const dispatch = useDispatch();

    // Selectors for user-related state
    const [deleteloading, setDeleteLoading] = useState(false);
    const [errorDeleteusers, setErrorDeleteusers] = useState(null);
    const [successDeleteusersMessage, setDeleteSuccessusersMessage] = useState(null);
    const { userError } = useSelector((state) => state.user);

    // Memoized deleteUser function
    const deleteUser = useCallback(
        async (userId) => {
            setDeleteLoading(true);
            try {
                await dispatch(deleteusers(userId)).unwrap(); // Ensure clean error handling
                setDeleteLoading(false);
                setDeleteSuccessusersMessage("player deleted successfully.");

            } catch (err) {
                setDeleteLoading(false);
                const deleteError = userError || err.message || "Failed to delete player.";
                setErrorDeleteusers(deleteError);
            }
        },
        [dispatch]
    );
    useEffect(() => {
        if (successDeleteusersMessage || errorDeleteusers) {
            const timer = setTimeout(() => {
                setDeleteSuccessusersMessage(null);
                setErrorDeleteusers(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successDeleteusersMessage, errorDeleteusers]);
    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);
        } catch (error) {
            console.error(`Failed to ${userId} user:`, error);
        } finally {
            closeModal();
        }
    };
    return {
        handleDelete,
        deleteloading,
        errorDeleteusers,
        successDeleteusersMessage,
        userError,
    };
};

export default useDeleteusers;
