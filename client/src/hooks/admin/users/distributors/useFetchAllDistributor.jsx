import { useDispatch, useSelector } from "react-redux";
import { fetchdistributorss } from "../../../../stores/actions/distributorAction";
import { useEffect } from 'react';
export default function useFetchAllDistributors() {
    const dispatch = useDispatch();
    const { distributors, distributorsLoading, distributorsMessage, distributorsError } = useSelector((state) => state.distributor);

    const fetchAllDistributors = async () => {
        await dispatch(fetchdistributorss()).unwrap();
    };
    // Fetch session data on mount
    useEffect(() => {
        dispatch(fetchdistributorss());
    }, []);
    return { distributors, distributorsLoading, distributorsMessage, distributorsError, fetchAllDistributors };
};