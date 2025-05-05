import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';
import { toggleUserStatus } from '../../../../stores/actions/distributorAction'; // Adjust the path as needed

export default function useActivateUser(closeModal) {
    const dispatch = useDispatch();

    // Local state to manage loading and errors
    const [stateloading, setStateLoading] = useState(false);
    const [errorSuperistributors, setErrorDistributors] = useState(null);
    const [successDistributorsMessage, setSuccessDistributorsMessage] = useState(null);
    const { distributorsError } = useSelector((state) => state.distributor);
    // Callback function to activate the user
    const activateDistributors = useCallback(
        async (userId, action) => {
            setStateLoading(true);
            setErrorDistributors(null);
            setSuccessDistributorsMessage(null);

            try {
                const response = await dispatch(toggleUserStatus({ userId, action })).unwrap();
                setSuccessDistributorsMessage(`User ${userId} has been successfully ${action}d.`);
                return response;
            } catch (err) {
                const stateError = distributorsError || err.message || 'Failed to update user status.'
                setErrorDistributors(stateError);
            } finally {
                setStateLoading(false);
            }
        },
        [dispatch]
    );
    useEffect(() => {
        if (successDistributorsMessage || errorSuperistributors) {
            const timer = setTimeout(() => {
                setSuccessDistributorsMessage(null);
                setErrorDistributors(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successDistributorsMessage, errorSuperistributors]);

    const handleActivateDeactivate = async (userId, isActive) => {
        const action = isActive ? "deactivate" : "activate";
        try {
            await activateDistributors(userId, action);
        } catch (error) {
            console.error(`Failed to ${action} user:`, error);
        } finally {
            closeModal();
        }
    };
    return {
        activateDistributors,
        handleActivateDeactivate,
        stateloading,
        errorSuperistributors,
        successDistributorsMessage
    };
}
