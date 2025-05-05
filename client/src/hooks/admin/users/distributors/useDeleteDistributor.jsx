import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState, useEffect } from "react";
import { deletedistributors } from "../../../../stores/actions/distributorAction";

const useDeleteSuperDistributors = (closeModal) => {
    const dispatch = useDispatch();

    // Selectors for user-related state
    const [deleteloading, setDeleteLoading] = useState(false);
    const [errorDeleteDistributors, setErrorDeleteDistributors] = useState(null);
    const [successDeleteDistributorsMessage, setDeleteSuccessDistributorsMessage] = useState(null);
    const { distributorsError } = useSelector((state) => state.distributor);

    // Memoized deleteUser function
    const deleteUser = useCallback(
        async (userId) => {
            setDeleteLoading(true);
            try {
                await dispatch(deletedistributors(userId)).unwrap(); // Ensure clean error handling
                setDeleteLoading(false);
                setDeleteSuccessDistributorsMessage("superareamanager deleted successfully.");

            } catch (err) {
                setDeleteLoading(false);
                const deleteError = distributorsError || err.message || "Failed to delete SuperDistributors.";
                setErrorDeleteDistributors(deleteError);
            }
        },
        [dispatch]
    );
    useEffect(() => {
        if (successDeleteDistributorsMessage || errorDeleteDistributors) {
            const timer = setTimeout(() => {
                setDeleteSuccessDistributorsMessage(null);
                setErrorDeleteDistributors(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successDeleteDistributorsMessage, errorDeleteDistributors]);
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
        errorDeleteDistributors,
        successDeleteDistributorsMessage,
        distributorsError,
    };
};

export default useDeleteSuperDistributors;
