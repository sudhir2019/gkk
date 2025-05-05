import { useDispatch, useSelector } from "react-redux";
import { fetchusers } from "../../../../stores/actions/loanActions";
import { useEffect } from 'react';
export default function useFetchAllGifts() {
    const dispatch = useDispatch();
    const { loans, loanLoading, loanMessage, loanError } = useSelector((state) => state.loan);

    const fetchAllUsers = async () => {
        await dispatch(fetchusers());
    };
    // Fetch session data on mount
    useEffect(() => {
        dispatch(fetchusers()); // ✅ Dispatch the async thunk directly
    }, [dispatch]); // Include dispatch as a dependency

    return { loans, loanLoading, loanMessage, loanError, fetchAllUsers };
};
