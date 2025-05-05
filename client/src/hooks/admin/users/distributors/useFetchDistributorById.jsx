import { useDispatch, useSelector } from "react-redux";
import { fetchdistributorsByIdAsync } from "../../../../stores/actions/distributorAction";
import { useEffect } from "react";
const useFetchDistributorsById = (any) => {
    const dispatch = useDispatch();
    const { distributor, distributorsLoading, distributorsMessage, distributorsError } = useSelector((state) => state.distributor);

    const fetchDistributorsById = async (DistributorsId) => {
        await dispatch(fetchdistributorsByIdAsync(DistributorsId)).unwrap();
    };
    useEffect(() => {
        if (any) {
            fetchDistributorsById(any);
        }
    }, [any]);

    return { distributor, distributorsLoading, distributorsMessage, distributorsError, fetchDistributorsById };
};

export default useFetchDistributorsById;