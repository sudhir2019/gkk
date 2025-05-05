import { useDispatch, useSelector } from "react-redux";
import { getAdminChildren } from "../../../../stores/actions/adminActions";
import { useEffect } from "react";
const useFetchAdminChildren = (adminId) => {
    const dispatch = useDispatch();
    const { admin, children, childrenLoading, childrenMessage, childrenError } = useSelector((state) => state.admins);

    const fetchAdminChildren = async (adminId) => {
        await dispatch(getAdminChildren(adminId)).unwrap();
    };
    useEffect(() => {
        if (adminId) {
            fetchAdminChildren(adminId);
        }
    }, [adminId]);

    return { admin, children, childrenLoading, childrenMessage, childrenError, fetchAdminChildren };
};

export default useFetchAdminChildren;