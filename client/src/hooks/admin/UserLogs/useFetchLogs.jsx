import { useDispatch, useSelector } from "react-redux";
import { getAllLogs, fetchUserLogs, fetchLogById, logUserActivity, fetchActivityLogs } from "../../../stores/actions/logsActions";
import { useEffect } from "react";


const useFetchLogs = () => {
    const dispatch = useDispatch();
    const { logs, log, logloading, logerror } = useSelector((state) => state.logs);

    const getAllLog = () => dispatch(getAllLogs());
    const getUserLogs = (userId) => dispatch(fetchUserLogs(userId));
    const getLogById = (logId) => dispatch(fetchLogById(logId));
    const logActivity = (data) => dispatch(logUserActivity(data));
    const getActivityLogs = () => dispatch(fetchActivityLogs());

    useEffect(() => {
        getAllLog(); // Fetch logs on mount
    }, [dispatch]);

    return {
        logs,
        log,
        logerror,
        logloading,
        getAllLog,
        getUserLogs,
        getLogById,
        logActivity,
        getActivityLogs,
    };
};

export default useFetchLogs;
