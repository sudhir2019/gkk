import { useDispatch, useSelector } from "react-redux";
import { getChildById } from "../../../../stores/actions/retailerAction";
import { useEffect } from "react";
const useFetchRetailerchildrenById = ({ any, id }) => {
    const dispatch = useDispatch();
    const { childrenInfo, childrenLoading, childrenError, childrenMessage } = useSelector((state) => state.retailer);
    const fetchretailerByIdById = async ({ any, id }) => {
        await dispatch(getChildById({ any, id })).unwrap();
    };
    useEffect(() => {
        if (any && id) {
            fetchretailerByIdById({ any, id });
        }
    }, [any, id]);

    return { childrenInfo, childrenLoading, childrenError, childrenMessage, fetchretailerByIdById };
};

export default useFetchRetailerchildrenById;