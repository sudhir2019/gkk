import { useDispatch, useSelector } from "react-redux";
import { fetchusers } from "../../../../stores/actions/userAction";
import { useEffect } from 'react';
export default function useFetchAllUsers() {
    const dispatch = useDispatch();
    const { users, userLoading, userMessage, userError } = useSelector((state) => state.user);

    const fetchAllUsers = async () => {
        await dispatch(fetchusers());
    };
    // Fetch session data on mount
    useEffect(() => {
        dispatch(fetchusers()); // ✅ Dispatch the async thunk directly
    }, [dispatch]); // Include dispatch as a dependency

    return { users, userLoading, userMessage, userError, fetchAllUsers };
};
