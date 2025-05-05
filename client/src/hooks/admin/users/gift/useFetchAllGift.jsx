import { useDispatch, useSelector } from "react-redux";
import { fetchusers } from "../../../../stores/actions/giftActions";
import { useEffect } from 'react';
export default function useFetchAllGifts() {
    const dispatch = useDispatch();
    const { gifts, giftLoading, giftMessage, giftError } = useSelector((state) => state.gift);

    const fetchAllUsers = async () => {
        await dispatch(fetchusers());
    };
    // Fetch session data on mount
    useEffect(() => {
        dispatch(fetchusers()); // ✅ Dispatch the async thunk directly
    }, [dispatch]); // Include dispatch as a dependency

    return { gifts, giftLoading, giftMessage, giftError, fetchAllUsers };
};
