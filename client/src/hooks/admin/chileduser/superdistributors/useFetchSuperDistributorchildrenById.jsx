import { useDispatch, useSelector } from "react-redux";
import { getsuperDistributorsChildById } from "../../../../stores/actions/superDistributorAction";
import { useEffect } from "react";
const useFetchSuperDistributorchildrenById = ({ any, id }) => {
    const dispatch = useDispatch();
    const { childrenInfo, childrenLoading, childrenError, childrenMessage } = useSelector((state) => state.superdistributor);
    const fetchSuperDistributorByIdById = async ({ any, id }) => {
        await dispatch(getsuperDistributorsChildById({ any, id })).unwrap();
    };
    useEffect(() => {
        if (any && id) {
            fetchSuperDistributorByIdById({ any, id });
        }
    }, [any, id]);

    return { childrenInfo, childrenLoading, childrenError, childrenMessage, fetchSuperDistributorByIdById };
};

export default useFetchSuperDistributorchildrenById;