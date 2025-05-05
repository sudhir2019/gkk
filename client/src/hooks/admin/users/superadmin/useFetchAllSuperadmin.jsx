import { useDispatch, useSelector } from "react-redux";
import { fetchSuperadmins } from "../../../../stores/actions/superadminAction";
import { useEffect } from 'react';
export default function useFetchAllSuperAdmins() {
    const dispatch = useDispatch();
    const { superadmins, superadminLoading, superadminMessage, superadminError } = useSelector((state) => state.superadmins);

    const fetchAllSuperAdmins = async () => {
        await dispatch(fetchSuperadmins()).unwrap();
    };
    // Fetch session data on mount
    useEffect(() => {
        dispatch(fetchSuperadmins());
    }, []);
    return { superadmins, superadminLoading, superadminMessage, superadminError, fetchAllSuperAdmins };
};