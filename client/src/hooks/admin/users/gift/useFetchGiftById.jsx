import { useDispatch, useSelector } from "react-redux";
import { fetchusersByIdAsync } from "../../../../stores/actions/giftActions";
import { useEffect } from "react";
const useFetchGigtsById = (userId) => {
    const dispatch = useDispatch();
    const { gift, giftLoading, giftMessage, giftError } = useSelector((state) => state.gift);
    const fetchUsersById = async (userId) => {
        await dispatch(fetchusersByIdAsync(userId)).unwrap();
    };
    useEffect(() => {
        if (userId) {
            fetchUsersById(userId);
        }
    }, [userId]);

    return { gift, giftLoading, giftMessage, giftError, fetchUsersById };
};

export default useFetchGigtsById;