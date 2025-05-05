import { useDispatch, useSelector } from "react-redux";
import { getsuperdistributorsChildren } from "../../../../stores/actions/superDistributorAction";
import { useEffect } from "react";
const useFetchSuperDistributorChildren = (adminId) => {
    const dispatch = useDispatch();
    const { superdistributor, children, childrenLoading, childrenMessage, childrenError } = useSelector((state) => state.superdistributor);

    const fetchSuperDistributorChildren = async (adminId) => {
        await dispatch(getsuperdistributorsChildren(adminId)).unwrap();
    };
    useEffect(() => {
        if (adminId) {
            fetchSuperDistributorChildren(adminId);
        }
    }, [adminId]);

    return { superdistributor, children, childrenLoading, childrenMessage, childrenError, fetchSuperDistributorChildren };
};

export default useFetchSuperDistributorChildren;