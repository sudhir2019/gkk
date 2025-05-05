import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';
import { toggleUserStatus } from '../../../../stores/actions/retailerAction'; // Adjust the path as needed

export default function useActivateUser(closeModal) {
    const dispatch = useDispatch();
    // Local state to manage loading and errors
    const [stateloading, setStateLoading] = useState(false);
    const [errorSuperistributors, setErrorretailers] = useState(null);
    const [successretailersMessage, setSuccessretailersMessage] = useState(null);
    const { retailerError } = useSelector((state) => state.retailer);
    // Callback function to activate the user
    const activateretailers = useCallback(
        async (userId, action) => {
            setStateLoading(true);
            setErrorretailers(null);
            setSuccessretailersMessage(null);

            try {
                const response = await dispatch(toggleUserStatus({ userId, action })).unwrap();
                setSuccessretailersMessage(`User ${userId} has been successfully ${action}d.`);
                return response;
            } catch (err) {
                const stateError = retailerError || err.message || 'Failed to update user status.'
                setErrorretailers(stateError);
            } finally {
                setStateLoading(false);
            }
        },
        [dispatch]
    );
    useEffect(() => {
        if (successretailersMessage || errorSuperistributors) {
            const timer = setTimeout(() => {
                setSuccessretailersMessage(null);
                setErrorretailers(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successretailersMessage, errorSuperistributors]);

    const handleActivateDeactivate = async (userId, isActive) => {
        const action = isActive ? "deactivate" : "activate";
        try {
            await activateretailers(userId, action);
        } catch (error) {
            console.error(`Failed to ${action} user:`, error);
        } finally {
            closeModal();
        }
    };
    return {
        activateretailers,
        handleActivateDeactivate,
        stateloading,
        errorSuperistributors,
        successretailersMessage
    };
}
