import { useDispatch, useSelector } from "react-redux";
import { fetchusersByIdAsync } from "../../../../stores/actions/otcActions";
import { useEffect } from "react";
const useFetchOtcsById = (userId) => {
    const dispatch = useDispatch();
    const { otc, otcLoading, otcMessage, otcError } = useSelector((state) => state.otc);
    const fetchUsersById = async (userId) => {
        await dispatch(fetchusersByIdAsync(userId)).unwrap();
    };
    useEffect(() => {
        if (userId) {
            fetchUsersById(userId);
        }
    }, [userId]);

    return { otc, otcLoading, otcMessage, otcError, fetchUsersById };
};

export default useFetchOtcsById;