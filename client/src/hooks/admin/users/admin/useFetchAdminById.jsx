import { useDispatch, useSelector } from "react-redux";
import { fetchAdminByIdAsync } from "../../../../stores/actions/adminActions";
import { useEffect } from "react";
const useFetchAdminById = (any) => {
    const dispatch = useDispatch();
    const { admin, adminLoading, adminMessage, adminError } = useSelector((state) => state.admins);

    const fetchAdminById = async (adminId) => {
        await dispatch(fetchAdminByIdAsync(adminId)).unwrap();
    };
    useEffect(() => {
        if (any) {
            fetchAdminById(any);
        }
    }, [any]);
 
    return { admin, adminLoading, adminMessage, adminError, fetchAdminById };
};

export default useFetchAdminById;