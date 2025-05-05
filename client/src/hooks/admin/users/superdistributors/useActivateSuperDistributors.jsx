import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';
import { toggleUserStatus } from '../../../../stores/actions/superDistributorAction'; // Adjust the path as needed

export default function useActivateUser(closeModal) {
    const dispatch = useDispatch();

    // Local state to manage loading and errors
    const [stateloading, setStateLoading] = useState(false);
    const [errorSuperistributors, setErrorSuperDistributors] = useState(null);
    const [successSuperDistributorsMessage, setSuccessSuperDistributorsMessage] = useState(null);
    const { superdistributorsError } = useSelector((state) => state.superdistributor);
    // Callback function to activate the user
    const activateSuperDistributors = useCallback(
        async (userId, action) => {
            setStateLoading(true);
            setErrorSuperDistributors(null);
            setSuccessSuperDistributorsMessage(null);

            try {
                const response = await dispatch(toggleUserStatus({ userId, action })).unwrap();
                setSuccessSuperDistributorsMessage(`User ${userId} has been successfully ${action}d.`);
                return response;
            } catch (err) {
                const stateError = superdistributorsError || err.message || 'Failed to update user status.'
                setErrorSuperDistributors(stateError);
            } finally {
                setStateLoading(false);
            }
        },
        [dispatch]
    );
    useEffect(() => {
        if (successSuperDistributorsMessage || errorSuperistributors) {
            const timer = setTimeout(() => {
                setSuccessSuperDistributorsMessage(null);
                setErrorSuperDistributors(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successSuperDistributorsMessage, errorSuperistributors]);

    const handleActivateDeactivate = async (userId, isActive) => {
        const action = isActive ? "deactivate" : "activate";
        try {
            await activateSuperDistributors(userId, action);
        } catch (error) {
            console.error(`Failed to ${action} user:`, error);
        } finally {
            closeModal();
        }
    };
    return {
        activateSuperDistributors,
        handleActivateDeactivate,
        stateloading,
        errorSuperistributors,
        successSuperDistributorsMessage
    };
}
