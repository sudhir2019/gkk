import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState, useEffect } from "react";
import { deleteChild } from "../../../../stores/actions/retailerAction";

const useDeleteRetailerChildren = (closeModal) => {
    const dispatch = useDispatch();

    // Selectors for user-related state
    const [deleteloading, setDeleteLoading] = useState(false);
    const [errorDeleteSuperDistributors, setErrorDeleteSuperDistributors] = useState(null);
    const [successDeleteSuperDistributorsMessage, setDeleteSuccessSuperDistributorsMessage] = useState(null);
    const { childrenError } = useSelector((state) => state.retailer);

    // Memoized deleteUser function
    const deleteUser = useCallback(
        async (userId, adminId) => {
            setDeleteLoading(true);
            try {
                await dispatch(deleteChild({ userId, adminId })).unwrap(); // Ensure clean error handling
                setDeleteLoading(false);
                setDeleteSuccessSuperDistributorsMessage("SuperDistributors deleted successfully.");

            } catch (err) {
                setDeleteLoading(false);
                const deleteError = childrenError || err.message || "Failed to delete SuperDistributors.";
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
    const handleDelete = async (userId, adminId) => {
        try {
            await deleteUser(userId, adminId);
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
        childrenError,
    };
};

export default useDeleteRetailerChildren;
