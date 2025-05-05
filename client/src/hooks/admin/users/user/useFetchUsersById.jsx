import { useDispatch, useSelector } from "react-redux";
import { fetchusersByIdAsync } from "../../../../stores/actions/userAction";
import { useEffect } from "react";
const useFetchUsersById = (userId) => {
    const dispatch = useDispatch();
    const { user, userLoading, userMessage, userError } = useSelector((state) => state.user);
    const fetchUsersById = async (userId) => {
        await dispatch(fetchusersByIdAsync(userId)).unwrap();
    };
    useEffect(() => {
        if (userId) {
            fetchUsersById(userId);
        }
    }, [userId]);

    return { user, userLoading, userMessage, userError, fetchUsersById };
};

export default useFetchUsersById;