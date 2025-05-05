import { useDispatch, useSelector } from "react-redux";
import { fetchsuperdistributorss } from "../../../../stores/actions/superDistributorAction";
import { useEffect } from 'react';
export default function useFetchAllSuperDistributors() {
    const dispatch = useDispatch();
    const { superdistributors, superdistributorsLoading, superdistributorsMessage, superdistributorsError } = useSelector((state) => state.superdistributor);

    const fetchAllSuperDistributors = async () => {
        await dispatch(fetchsuperdistributorss()).unwrap();
    };
    // Fetch session data on mount
    useEffect(() => {
        dispatch(fetchsuperdistributorss());
    }, []);
    return { superdistributors, superdistributorsLoading, superdistributorsMessage, superdistributorsError, fetchAllSuperDistributors };
};