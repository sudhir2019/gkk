import { useDispatch, useSelector } from "react-redux";
import { fetchretailersByIdAsync } from "../../../../stores/actions/retailerAction";
import { useEffect } from "react";
const useFetchretailersById = (retailerssId) => {
    const dispatch = useDispatch();
    const { retailer, retailerLoading, retailerMessage, retailerError } = useSelector((state) => state.retailer);

    const fetchretailerssById = async (retailerssId) => {
        await dispatch(fetchretailersByIdAsync(retailerssId)).unwrap();
    };
    useEffect(() => {
        if (retailerssId) {
            fetchretailerssById(retailerssId);
        }
    }, [retailerssId]);

    return { retailer, retailerLoading, retailerMessage, retailerError, fetchretailerssById };
};

export default useFetchretailersById;