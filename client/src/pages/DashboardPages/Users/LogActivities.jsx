import useFetchLogs from '../../../hooks/admin/UserLogs/useFetchLogs';
import LogDataTable from "../../../components/TablesComponents/LogDataTable";
import { ScaleLoader } from "react-spinners"

function LogActivities() {
    // State for selected date
    const { logs, logerror, logloading } = useFetchLogs();
    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <LogDataTable logs={logs} />
            </div>
            {logloading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <ScaleLoader />
                </div>
            )}
        </div>
    );
}

export default LogActivities;