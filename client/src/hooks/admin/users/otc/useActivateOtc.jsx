import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';
import { toggleUserStatus } from '../../../../stores/actions/otcActions'; // Adjust the path as needed

export default function useActivateOtc(closeModal) {
    const dispatch = useDispatch();
    // Local state to manage loading and errors
    const [stateloading, setStateLoading] = useState(false);
    const [errorUsers, setErrorUsers] = useState(null);
    const [successUsersMessage, setSuccessUsersMessage] = useState(null);
    const { otcError } = useSelector((state) => state.otc);
    // Callback function to activate the user
    const activateUsers = useCallback(
        async (userId, action) => {
            setStateLoading(true);
            setErrorUsers(null);
            setSuccessUsersMessage(null);

            try {
                const response = await dispatch(toggleUserStatus({ userId, action })).unwrap();
                setSuccessUsersMessage(`User ${userId} has been successfully ${action}d.`);
                return response;
            } catch (err) {
                const stateError = otcError || err.message || 'Failed to update user status.'
                setErrorUsers(stateError);
            } finally {
                setStateLoading(false);
            }
        },
        [dispatch]
    );
    useEffect(() => {
        if (successUsersMessage || errorUsers) {
            const timer = setTimeout(() => {
                setSuccessUsersMessage(null);
                setErrorUsers(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successUsersMessage, errorUsers]);

    const handleActivateDeactivate = async (userId, isActive) => {
        const action = isActive ? "deactivate" : "activate";
        try {
            await activateUsers(userId, action);
        } catch (error) {
            console.error(`Failed to ${action} user:`, error);
        } finally {
            closeModal();
        }
    };
    return {
        activateUsers,
        handleActivateDeactivate,
        stateloading,
        errorUsers,
        successUsersMessage
    };
}
