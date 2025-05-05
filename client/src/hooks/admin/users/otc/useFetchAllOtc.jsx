import { useDispatch, useSelector } from "react-redux";
import { fetchusers } from "../../../../stores/actions/otcActions";
import { useEffect } from 'react';

export default function useFetchAllGifts() {
    const dispatch = useDispatch();
    const { otcs, otcLoading, otcMessage, otcError } = useSelector((state) => state.otc);

    const fetchAllUsers = async () => {
        await dispatch(fetchusers());
    };
    // Fetch session data on mount
    useEffect(() => {
        dispatch(fetchusers()); // ✅ Dispatch the async thunk directly
    }, [dispatch]); // Include dispatch as a dependency

    return { otcs, otcLoading, otcMessage, otcError, fetchAllUsers };
};
