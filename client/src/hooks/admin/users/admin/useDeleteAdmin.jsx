import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState, useEffect } from "react";
import { deleteAdmin } from "../../../../stores/actions/adminActions";

const useDeleteAdmin = (closeModal) => {
    const dispatch = useDispatch();

    // Selectors for user-related state
    const [deleteloading, setDeleteLoading] = useState(false);
    const [errorDeleteAdmin, setErrorDeleteAdmin] = useState(null);
    const [successDeleteAdminMessage, setDeleteSuccessAdminMessage] = useState(null);
    const { adminError } = useSelector((state) => state.admins);

    // Memoized deleteUser function
    const deleteUser = useCallback(
        async (userId) => {
            setDeleteLoading(true);
            try {
                await dispatch(deleteAdmin(userId)).unwrap(); // Ensure clean error handling
                setDeleteLoading(false);
                setDeleteSuccessAdminMessage("Admin deleted successfully.");

            } catch (err) {
                setDeleteLoading(false);
                const deleteError = adminError || err.message || "Failed to delete admin.";
                setErrorDeleteAdmin(deleteError);
            }
        },
        [dispatch]
    );
    useEffect(() => {
        if (successDeleteAdminMessage || errorDeleteAdmin) {
            const timer = setTimeout(() => {
                setDeleteSuccessAdminMessage(null);
                setErrorDeleteAdmin(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successDeleteAdminMessage, errorDeleteAdmin]);
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
        errorDeleteAdmin,
        successDeleteAdminMessage,
        adminError,
    };
};

export default useDeleteAdmin;
