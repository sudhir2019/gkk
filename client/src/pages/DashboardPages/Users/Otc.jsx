import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners"

import AddOtc from "../../../components/ActionModel/otc/AddOtc";
import EditOtc from "../../../components/ActionModel/otc/EditOtc";
import OtcCreditTransfers from "../../../components/ActionModel/otc/OtcCreditTransfers";
import OtcCreditAdjust from "../../../components/ActionModel/otc/OtcCreditAdjust";

import Modal from "../../../components/ActionModel/Models/Modal";
import OtcDataTable from "../../../components/TablesComponents/OtcDataTable";

import useActivateOtc from '../../../hooks/admin/users/otc/useActivateOtc';
import useDeleteOtc from '../../../hooks/admin/users/otc/useDeleteOtc';
import useFetchAllOtc from "../../../hooks/admin/users/otc/useFetchAllOtc";


export default function Otc() {
    const { action } = useParams();

    const { otcs, otcLoading } = useFetchAllOtc();
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

    const { handleActivateDeactivate, stateloading } = useActivateOtc(closeModal);
    const { handleDelete, deleteloading } = useDeleteOtc(closeModal);

    if (action === "edit") {
        return <EditOtc />;
    }
    if (action === "credittransfer") {
        return <OtcCreditTransfers />;
    }
    if (action === "creditadjust") {
        return <OtcCreditAdjust />;
    }

    // if (action === "create") {
    //     return <AddOtc />;
    // }

    if (action === undefined || action === null) {
        return (

            <div className="row relative">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between mb-2">
                            <b>Otc</b>
                            {/* <Link to={`create`} className="btn btn-primary btn-md">
                                Add Otc
                            </Link> */}
                        </div>
                        <div className="card-body">
                            <OtcDataTable

                                distributers={Array.isArray(otcs) ? otcs : []}
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
                {otcLoading || deleteloading || stateloading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <ScaleLoader />
                    </div>
                )}
            </div>
        );
    }
};
