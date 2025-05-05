import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState, useEffect } from "react";
import { deleteChild } from "../../../../stores/actions/adminActions";

const useDeleteAdmin = (closeModal) => {
    const dispatch = useDispatch();

    // Selectors for user-related state
    const [deleteloading, setDeleteLoading] = useState(false);
    const [errorDeleteadmin, setErrorDeleteadmin] = useState(null);
    const [successDeleteadminMessage, setDeleteSuccessadminMessage] = useState(null);
    const { childrenError } = useSelector((state) => state.admins);

    // Memoized deleteUser function
    const deleteUser = useCallback(
        async (userId, adminId) => {
            setDeleteLoading(true);
            try {
                await dispatch(deleteChild({ userId, adminId })).unwrap(); // Ensure clean error handling
                setDeleteLoading(false);
                setDeleteSuccessadminMessage("admin deleted successfully.");

            } catch (err) {
                setDeleteLoading(false);
                const deleteError = childrenError || err.message || "Failed to delete admin.";
                setErrorDeleteadmin(deleteError);
            }
        },
        [dispatch]
    );
    useEffect(() => {
        if (successDeleteadminMessage || errorDeleteadmin) {
            const timer = setTimeout(() => {
                setDeleteSuccessadminMessage(null);
                setErrorDeleteadmin(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successDeleteadminMessage, errorDeleteadmin]);
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
        errorDeleteadmin,
        successDeleteadminMessage,
        childrenError,
    };
};

export default useDeleteAdmin;
