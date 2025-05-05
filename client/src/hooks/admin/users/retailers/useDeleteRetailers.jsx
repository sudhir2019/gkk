import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState, useEffect } from "react";
import { deleteretailers } from "../../../../stores/actions/retailerAction";

const useDeleteRetailers = (closeModal) => {
    const dispatch = useDispatch();

    // Selectors for user-related state
    const [deleteloading, setDeleteLoading] = useState(false);
    const [errorDeleteRetailers, setErrorDeleteRetailers] = useState(null);
    const [successDeleteRetailersMessage, setDeleteSuccessRetailersMessage] = useState(null);
    const { retailerError } = useSelector((state) => state.retailer);

    // Memoized deleteUser function
    const deleteUser = useCallback(
        async (userId) => {
            setDeleteLoading(true);
            try {
                await dispatch(deleteretailers(userId)).unwrap(); // Ensure clean error handling
                setDeleteLoading(false);
                setDeleteSuccessRetailersMessage("master deleted successfully.");

            } catch (err) {
                setDeleteLoading(false);
                const deleteError = retailerError || err.message || "Failed to delete master.";
                setErrorDeleteRetailers(deleteError);
            }
        },
        [dispatch]
    );
    useEffect(() => {
        if (successDeleteRetailersMessage || errorDeleteRetailers) {
            const timer = setTimeout(() => {
                setDeleteSuccessRetailersMessage(null);
                setErrorDeleteRetailers(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successDeleteRetailersMessage, errorDeleteRetailers]);
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
        errorDeleteRetailers,
        successDeleteRetailersMessage,
        retailerError,
    };
};

export default useDeleteRetailers;
