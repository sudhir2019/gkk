import { useDispatch, useSelector } from "react-redux";
import { fetchAdmins } from "../../../../stores/actions/adminActions";
import { useEffect } from 'react';
export default function useFetchAllAdmins() {
    const dispatch = useDispatch();
    const { admins, adminLoading, adminMessage, adminError } = useSelector((state) => state.admins);

    const fetchAllAdmins = async () => {
        await dispatch(fetchAdmins()).unwrap();
    };
    // Fetch session data on mount
    useEffect(() => {
        dispatch(fetchAdmins());
    }, []);
    return { admins, adminLoading, adminMessage, adminError, fetchAllAdmins };
};