import { useDispatch, useSelector } from "react-redux";
import { fetchusersByIdAsync } from "../../../../stores/actions/loanActions";
import { useEffect } from "react";
const useFetchGigtsById = (userId) => {
    const dispatch = useDispatch();
    const { loan, loanLoading, loanMessage, loanError } = useSelector((state) => state.loan);
    const fetchUsersById = async (userId) => {
        await dispatch(fetchusersByIdAsync(userId)).unwrap();
    };
    useEffect(() => {
        if (userId) {
            fetchUsersById(userId);
        }
    }, [userId]);

    return { loan, loanLoading, loanMessage, loanError, fetchUsersById };
};

export default useFetchGigtsById;