import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTransferableData, loadReceivableData, loadBalance } from "../stores/actions/appActions";

export default function useDashboard() {
    const dispatch = useDispatch();
    const { authUser } = useSelector((state) => state.auth);
    const { transferData, receiveData,userData,successMessage} = useSelector((state) => state.app);

    const fetchData = useCallback(async () => {
        try {
            await Promise.all([
                dispatch(loadBalance()).unwrap(),
                dispatch(loadTransferableData()).unwrap(),
                dispatch(loadReceivableData()).unwrap()
            ]);
        } catch (error) {
            console.error("Failed to load data:", error);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]); // ✅ Uses fetchData (memoized with useCallback) as dependency


    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                dispatch(clearSuccessMessage()); // ✅ Clear message after 3 seconds
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, dispatch]);

    
    // Expose fetchData as refreshButton
    return {
        successMessage,
        authUser,
        userData,
        transferData,
        receiveData,
        refreshButton: fetchData // ✅ This allows components to trigger a refresh
    };
}


