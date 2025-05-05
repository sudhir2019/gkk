import { useDispatch, useSelector } from "react-redux";
import { getChildById } from "../../../../stores/actions/distributorAction";
import { useEffect } from "react";
const useFetchDistributorchildrenById = ({ any, id }) => {
    console.log(any, id)
    const dispatch = useDispatch();
    const { childrenInfo, childrenLoading, childrenError, childrenMessage } = useSelector((state) => state.distributor);
    const fetchSuperDistributorByIdById = async ({ any, id }) => {
        await dispatch(getChildById({ any, id })).unwrap();
    };
    useEffect(() => {
        if (any && id) {
            fetchSuperDistributorByIdById({ any, id });
        }
    }, [any, id]);

    return { childrenInfo, childrenLoading, childrenError, childrenMessage, fetchSuperDistributorByIdById };
};

export default useFetchDistributorchildrenById;