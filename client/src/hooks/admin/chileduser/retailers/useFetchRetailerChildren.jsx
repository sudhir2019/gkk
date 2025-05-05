import { useDispatch, useSelector } from "react-redux";
import { getretailersChildren } from "../../../../stores/actions/retailerAction";
import { useEffect } from "react";
const useFetchRetailerChildren = (adminId) => {
    const dispatch = useDispatch();
    const { retailer, children, childrenLoading, childrenMessage, childrenError } = useSelector((state) => state.retailer);

    const fetchRetailerChildren = async (adminId) => {
        await dispatch(getretailersChildren(adminId)).unwrap();
    };
    useEffect(() => {
        if (adminId) {
            fetchRetailerChildren(adminId);
        }
    }, [adminId]);

    return { retailer, children, childrenLoading, childrenMessage, childrenError, fetchRetailerChildren };
};

export default useFetchRetailerChildren;