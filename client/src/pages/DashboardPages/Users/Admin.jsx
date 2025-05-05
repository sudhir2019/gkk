import {  useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners"

import AddAdmin from "../../../components/ActionModel/admin/AddAdmin";
import EditAdmin from "../../../components/ActionModel/admin/EditAdmin";
import AdminCreditTransfers from "../../../components/ActionModel/admin/AdminCreditTransfers";
import AdminCreditAdjust from "../../../components/ActionModel/admin/AdminCreditAdjust";

import Modal from "../../../components/ActionModel/Models/Modal";
import AdminDataTable from "../../../components/TablesComponents/AdminDataTable";

import useActivateAdmin from '../../../hooks/admin/users/admin/useActivateAdmin';
import useDeleteAdmin from '../../../hooks/admin/users/admin/useDeleteAdmin';
import useFetchAllAdmins from "../../../hooks/admin/users/admin/useFetchAllAdmins";
import AdminDetails from "../Details/AdminDetails";


export default function Admin() {
    const { action } = useParams();
    const { admins, adminLoading } = useFetchAllAdmins();
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

    const { stateloading, handleActivateDeactivate } = useActivateAdmin(closeModal);
    const { handleDelete, deleteloading } = useDeleteAdmin(closeModal);

    if (action === "edit") {
        return <EditAdmin />;
    }
    if (action === "credittransfer") {
        return <AdminCreditTransfers />;
    }
    if (action === "creditadjust") {
        return <AdminCreditAdjust />;
    }

    if (action === "create") {
        return <AddAdmin />;
    }
    if (action === "details") {
        return <AdminDetails />
    }
    if (action === undefined || action === null) {
        return (
            <div className="row relative">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between mb-2">
                            <b>Admin</b>
                            <Link to={`create`} className="btn btn-primary btn-md">
                                Add Admin
                            </Link>
                        </div>
                        <div className="card-body">
                            <AdminDataTable
                                admins={Array.isArray(admins) ? admins : []}
                                openModal={openModal}
                                handleActivateDeactivate={handleActivateDeactivate}
                                handleDelete={handleDelete}
                                adminLoading={adminLoading}
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
                {adminLoading || stateloading || deleteloading&& (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <ScaleLoader />
                    </div>
                )}
            </div>
        );
    }
};
