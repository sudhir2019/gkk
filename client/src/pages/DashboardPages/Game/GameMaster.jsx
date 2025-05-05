import 'bootstrap/dist/css/bootstrap.min.css';


import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners"

import GameEdit from "../../../components/ActionModel/Game/GameEdit";
import GameAdd from "../../../components/ActionModel/Game/GameAdd";
import Modal from "../../../components/ActionModel/Models/Modal";
import GameDataTable from "../../../components/TablesComponents/GameDataTable";

import { useDeleteGame } from '../../../hooks/admin/games/useDeleteGame';
import { useFetchGames } from '../../../hooks/admin/games/useFetchGames';
import useActivateGame from "../../../hooks/admin/games/useActivateGame";




export default function GameMaster() {
    const { action } = useParams();
    const { games, gamesLoading, fetchAllGames } = useFetchGames();
    useEffect(() => {
        fetchAllGames();
    }, []);
    const { removeGame } = useDeleteGame();
    const { activateGame } = useActivateGame();
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

    const closeModal = () => {
        setModalVisible(false);
        setOnConfirmAction(null);
    };

    const handleDelete = async (gameId) => {
        try {
            await removeGame(gameId);
        } catch (error) {
            console.error(`Failed to delete game:`, error);
        } finally {
            closeModal();
        }
    };
    const handleActivateDeactivate = async (userId, isActive) => {
        const action = isActive ? "deactivate" : "activate";
        try {
            await activateGame(userId, action);
        } catch (error) {
            console.error(`Failed to ${action} user:`, error);
        } finally {
            closeModal();
        }
    };

    if (action === "edit") {
        return <GameEdit />;
    }

    if (action === "create") {
        return <GameAdd userType={"Game Master"}  />;
    }


    if (action === undefined || action === null) {


        return (
            <div className="row relative">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between mb-2">
                            <b>Game Master</b>
                            <Link to={`create`} className="btn btn-primary btn-md">
                                Add Game
                            </Link>
                        </div>
                        <div className="card-body">
                            <GameDataTable
                                games={games}
                                openModal={openModal}
                                handleActivateDeactivate={handleActivateDeactivate}
                                handleDelete={handleDelete}
                            />
                        </div>
                    </div>
                </div>
                <Modal
                    show={modalVisible}
                    onClose={closeModal}
                    title={modalTitle}
                    onConfirm={onConfirmAction}
                >
                    {modalContent}
                </Modal>
                {gamesLoading && (
                    <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <ScaleLoader />
                    </div>
                )}
            </div>
        );
    }
}