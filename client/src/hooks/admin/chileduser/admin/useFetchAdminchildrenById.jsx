import { useDispatch, useSelector } from "react-redux";
import { getChildById } from "../../../../stores/actions/adminActions";
import { useEffect } from "react";
const useFetchAdminchildrenById = ({ any, id }) => {
    const dispatch = useDispatch();
    const { childrenInfo, childrenLoading, childrenError, childrenMessage } = useSelector((state) => state.admins);
    const fetchAdminById = async ({ any, id }) => {
        await dispatch(getChildById({ any, id })).unwrap();
    };
    useEffect(() => {
        if (any && id) {
            fetchAdminById({ any, id });
        }
    }, [any, id]);

    return { childrenInfo, childrenLoading, childrenError, childrenMessage, fetchAdminById };
};

export default useFetchAdminchildrenById;