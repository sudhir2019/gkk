import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchGamepercentageByAdmin } from "../../../stores/actions/percentageActions";

const useGamepercentageByAdmin = () => {
    const dispatch = useDispatch();
    const { adminGameList, historyUsers, gamesList, percentageLoading, percentageMessage, percentageError } = useSelector((state) => state.percentage);
    const { authUser } = useSelector((state) => state.auth);
    // Fetch session data on mount
    const role = authUser?.role;
    const id = authUser._id;
    const fetchGamepercentage = async (id) => {
        await dispatch(fetchGamepercentageByAdmin(id)).unwrap();
    };

    useEffect(() => {
        fetchGamepercentage(id);
    }, [authUser]);
    let percentagelist = adminGameList;
    // if (role === "superadmin") {
    //     percentagelist = adminGameList;
    // } else {
    //     percentagelist = gamesList;
    // }
    // console.log("adminGameList:-",adminGameList)
    // console.log("gamesList:-", gamesList)
    return { id, percentagelist, historyUsers, percentageLoading, percentageMessage, percentageError, fetchGamepercentage };
}

export default useGamepercentageByAdmin;
