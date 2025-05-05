import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners"

import AddUser from "../../../components/ActionModel/user/AddUser";
import EditUser from "../../../components/ActionModel/user/EditUser";
import UserCreditTransfers from "../../../components/ActionModel/user/UserCreditTransfers";
import UserCreditAdjust from "../../../components/ActionModel/user/UserCreditAdjust";

import Modal from "../../../components/ActionModel/Models/Modal";
import UserDataTable from "../../../components/TablesComponents/UserDataTable";

import useActivateUser from '../../../hooks/admin/users/user/useActivateUsers';
import useDeleteUser from '../../../hooks/admin/users/user/useDeleteUsers';
import useFetchAllUsers from "../../../hooks/admin/users/user/useFetchAllUsers";
import { fetchusers } from "../../../stores/actions/userAction";
import { useDispatch } from "react-redux";

export default function Users() {
    const { action } = useParams();
    const { users, userLoading } = useFetchAllUsers();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchusers());
    }, [action, dispatch])


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


    const { handleActivateDeactivate } = useActivateUser(closeModal);
    const { handleDelete } = useDeleteUser(closeModal);

    if (action === "edit") {
        return <EditUser />;
    }
    if (action === "credittransfer") {
        return <UserCreditTransfers />;
    }
    if (action === "creditadjust") {
        return <UserCreditAdjust />;
    }

    if (action === "create") {
        return <AddUser />;
    }
    if (action === undefined || action === null) {
        return (

            <div className="row relative">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between mb-2">
                            <b>Player</b>
                            <Link to={`create`} className="btn btn-primary btn-md">
                                Add Player
                            </Link>
                        </div>
                        <div className="card-body">
                            <UserDataTable
                                users={Array.isArray(users) ? users : []}
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
                    onConfirm={onConfirmAction}>
                    {modalContent}
                </Modal>
                {userLoading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <ScaleLoader />
                    </div>
                )}
            </div>
        );
    }
};