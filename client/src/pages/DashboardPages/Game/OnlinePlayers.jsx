import { useGetOnlinePlayer } from '../../../hooks/admin/onlinePlayer/useGetOnlinePlayer';
import OnlineUserTable from '../../../components/TablesComponents/OnlineUserTable';
import { ScaleLoader } from "react-spinners";

function OnlinePlayers() {
  const {
    onlineplayers,
    onlineplayerLoading,
  } = useGetOnlinePlayer();

  return (
    <div className="row">
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h6 className="card-title">Online Players</h6>
            <OnlineUserTable users={onlineplayers} />
          </div>
        </div>
      </div>

      {onlineplayerLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ScaleLoader />
        </div>
      )}
    </div>
  );
}

export default OnlinePlayers;
