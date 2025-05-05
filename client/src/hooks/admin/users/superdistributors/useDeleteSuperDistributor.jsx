import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState, useEffect } from "react";
import { deletesuperdistributors } from "../../../../stores/actions/superDistributorAction";

const useDeleteSuperDistributors = (closeModal) => {
    const dispatch = useDispatch();

    // Selectors for user-related state
    const [deleteloading, setDeleteLoading] = useState(false);
    const [errorDeleteSuperDistributors, setErrorDeleteSuperDistributors] = useState(null);
    const [successDeleteSuperDistributorsMessage, setDeleteSuccessSuperDistributorsMessage] = useState(null);
    const { superdistributorsError } = useSelector((state) => state.superdistributor);

    // Memoized deleteUser function
    const deleteUser = useCallback(
        async (userId) => {
            setDeleteLoading(true);
            try {
                await dispatch(deletesuperdistributors(userId)).unwrap(); // Ensure clean error handling
                setDeleteLoading(false);
                setDeleteSuccessSuperDistributorsMessage("superareamanager deleted successfully.");

            } catch (err) {
                setDeleteLoading(false);
                const deleteError = superdistributorsError || err.message || "Failed to delete SuperDistributors.";
                setErrorDeleteSuperDistributors(deleteError);
            }
        },
        [dispatch]
    );
    useEffect(() => {
        if (successDeleteSuperDistributorsMessage || errorDeleteSuperDistributors) {
            const timer = setTimeout(() => {
                setDeleteSuccessSuperDistributorsMessage(null);
                setErrorDeleteSuperDistributors(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successDeleteSuperDistributorsMessage, errorDeleteSuperDistributors]);
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
        errorDeleteSuperDistributors,
        successDeleteSuperDistributorsMessage,
        superdistributorsError,
    };
};

export default useDeleteSuperDistributors;
