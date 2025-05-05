import { useDispatch, useSelector } from "react-redux";
import { getdistributorChildren } from "../../../../stores/actions/distributorAction";
import { useEffect } from "react";
const useFetchDistributorChildren = (adminId) => {
    const dispatch = useDispatch();
    const { distributor, children, childrenLoading, childrenMessage, childrenError } = useSelector((state) => state.distributor);

    const fetchDistributorChildren = async (adminId) => {
        await dispatch(getdistributorChildren(adminId)).unwrap();
    };
    useEffect(() => {
        if (adminId) {
            fetchDistributorChildren(adminId);
        }
    }, [adminId]);

    return { distributor, children, childrenLoading, childrenMessage, childrenError, fetchDistributorChildren };
};

export default useFetchDistributorChildren;