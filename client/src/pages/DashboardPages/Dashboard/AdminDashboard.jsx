import Card from '../../../components/ui/Card';
import { UsersRound } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCount } from '../../../stores/actions/superActions';



function AdminDashboard() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserCount());
    }, [dispatch])
    const { usercount, isLoading } = useSelector((state) => state.supers);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
                <div>
                    <h4 className="mb-3 mb-md-0">Welcome to Dashboard</h4>
                </div>
            </div>

            <div className="row">
                <Card
                    title="Player"
                    value={isLoading ? "Loading..." : (usercount?.count?.length ?? 0)}

                    icon={<UsersRound className='h-12 w-12' />}
                    link="player"
                />

                <>
                    <Card
                        title="Super Area manager"
                        value={isLoading ? "Loading..." : usercount?.countSuperDistributors || 0}
                        icon={<UsersRound className='h-12 w-12' />}
                        link="superareamanager"
                    />

                    <Card
                        title="Area Manager"
                        value={isLoading ? "Loading..." : usercount?.countDistributors || 0}
                        icon={<UsersRound className='h-12 w-12' />}
                        link="areamanager"
                    />
                    <Card
                        title="Master"
                        value={isLoading ? "Loading..." : usercount?.countRetailers || 0}
                        icon={<UsersRound className='h-12 w-12' />}
                        link="master"
                    />


                </>
            </div>
        </div>
    );
}

export default AdminDashboard;
