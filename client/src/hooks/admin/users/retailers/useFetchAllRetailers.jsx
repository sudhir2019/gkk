import { useDispatch, useSelector } from "react-redux";
import { fetchretailers } from "../../../../stores/actions/retailerAction";
import { useEffect } from 'react';
export default function useFetchAllRetailers() {
    const dispatch = useDispatch();
    const { retailers, retailerLoading, retailerMessage, retailerError } = useSelector((state) => state.retailer);

    const fetchAllRetailers = async () => {
        await dispatch(fetchretailers()).unwrap();
    };
    // Fetch session data on mount
    useEffect(() => {
        dispatch(fetchretailers());
    }, []);
    return { retailers, retailerLoading, retailerMessage, retailerError, fetchAllRetailers };
};