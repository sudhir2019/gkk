import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';
import { toggleUserStatus } from '../../../../stores/actions/adminActions'; // Adjust the path as needed

export default function useActivateUser(closeModal) {
    const dispatch = useDispatch();

    // Local state to manage loading and errors
    const [stateloading, setStateLoading] = useState(false);
    const [errorAdmin, setErrorAdmin] = useState(null);
    const [successAdminMessage, setSuccessAdminMessage] = useState(null);
    const { adminError } = useSelector((state) => state.admins);
    // Callback function to activate the user
    const activateAdmin = useCallback(
        async (userId, action) => {
            setStateLoading(true);
            setErrorAdmin(null);
            setSuccessAdminMessage(null);

            try {
                const response = await dispatch(toggleUserStatus({ userId, action })).unwrap();
                setSuccessAdminMessage(`User ${userId} has been successfully ${action}d.`);
                return response;
            } catch (err) {
                const stateError = adminError || err.message || 'Failed to update user status.'
                setErrorAdmin(stateError);
            } finally {
                setStateLoading(false);
            }
        },
        [dispatch]
    );
    useEffect(() => {
        if (successAdminMessage || errorAdmin) {
            const timer = setTimeout(() => {
                setSuccessAdminMessage(null);
                setErrorAdmin(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successAdminMessage, errorAdmin]);

    const handleActivateDeactivate = async (userId, isActive) => {
        const action = isActive ? "deactivate" : "activate";
        try {
            await activateAdmin(userId, action);
        } catch (error) {
            console.error(`Failed to ${action} user:`, error);
        } finally {
            closeModal();
        }
    };
    return {
        activateAdmin,
        handleActivateDeactivate,
        stateloading,
        errorAdmin,
        successAdminMessage
    };
}
