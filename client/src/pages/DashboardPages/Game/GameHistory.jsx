import { useEffect, useState } from 'react';
import useGamepercentageByAdmin from '../../../hooks/admin/percentage/useGamepercentageByAdmin';
import { GET } from '../../../utils/http';
import api from '../../../utils/axiosInstance';
import GameHistoryDataModel from '../../../components/TablesComponents/GameHistoryDataModel';


function GameHistory() {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [onConfirmAction, setOnConfirmAction] = useState(null);
    const openModal = (content, title, onConfirm) => {
      setModalContent(content);
      setModalTitle(title);
      setOnConfirmAction(() => onConfirm);
      setModalVisible(true);
    };

   
  
  
    const { percentagelist, historyUsers } = useGamepercentageByAdmin();
    const [gameId, setGameId] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        // if (gameId) {
            loadGameHistory();
        // }
    }, [gameId]);

    async function loadGameHistory() {
        try {
            const response = await api.get(`/history/gamehistory?gameId=${gameId}`);
            setData(response.data?.data || []);
        } catch (error) {
            console.error("Failed to fetch game history:", error);
        }
    }
    // console.log(data);

    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h6 className="card-title">Bet List</h6>
                        <div className="form-group d-flex flex-wrap">
                            <div className="mr-2">
                                <label><strong>Select Game :</strong></label>
                                <div className="d-flex">
                                    <select id="game_type" className="js-example-basic-single w-100" onChange={(e) => setGameId(e.target.value)}>
                                        <option value="" defaultValue={""}>--Select Game--</option>
                                        {
                                            percentagelist && percentagelist.map((obj, ind) => {
                                                return (
                                                    <option key={ind} value={obj.gameId}>{obj.gameName}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="mr-2">
                                <label><strong>Select User :</strong></label>
                                <div className="d-flex">
                                    <select id="user_id" className="js-example-basic-single w-100" >
                                        <option value="">--Select User--</option>
                                        {
                                            historyUsers && historyUsers.map((obj, ind) => {
                                                return (
                                                    <option key={ind} value={obj._id}>{obj.username}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="mr-2">
                                <label><strong>Select Date Range :</strong></label>
                                <div className="d-flex">
                                    <select name="searchlimit" id="searchlimit" className="js-example-basic-single w-100" >
                                        <option value="" selected="selected" defaultValue={""}>Select Date Range</option>
                                        <option value="1">Today</option>
                                        <option value="2">Yesterday</option>
                                        <option value="3">This Week</option>
                                        <option value="4">Last Week</option>
                                        <option value="5">This Month</option>
                                        <option value="6">Last Month</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mr-2">
                                <label><strong>Select Date :</strong></label>
                                <div className="d-flex">
                                    <div className="input-group ">
                                        <input type="date" className="form-control" name="to" id="to" />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <GameHistoryDataModel
                                data={data}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameHistory