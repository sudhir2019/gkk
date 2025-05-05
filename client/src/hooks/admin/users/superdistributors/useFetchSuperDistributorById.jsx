import { useDispatch, useSelector } from "react-redux";
import { fetchsuperdistributorsByIdAsync } from "../../../../stores/actions/superDistributorAction";
import { useEffect } from "react";
const useFetchSuperDistributorsById = (any) => {
    const dispatch = useDispatch();
    const { superdistributor, superdistributorsLoading, superdistributorsMessage, superdistributorsError } = useSelector((state) => state.superdistributor);

    const fetchSuperDistributorsById = async (SuperDistributorsId) => {
        await dispatch(fetchsuperdistributorsByIdAsync(SuperDistributorsId)).unwrap();
    };
    useEffect(() => {
        if (any) {
            fetchSuperDistributorsById(any);
        }
    }, [any]);

    return { superdistributor, superdistributorsLoading, superdistributorsMessage, superdistributorsError, fetchSuperDistributorsById };
};

export default useFetchSuperDistributorsById;