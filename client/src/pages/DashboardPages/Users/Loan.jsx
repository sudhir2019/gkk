import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners"

import AddLoan from "../../../components/ActionModel/Loan/AddLoan";
import EditLoan from "../../../components/ActionModel/Loan/EditLoan";
import LoanCreditTransfers from "../../../components/ActionModel/Loan/LoanCreditTransfers";
import LoanCreditAdjust from "../../../components/ActionModel/Loan/LoanCreditAdjust";

import Modal from "../../../components/ActionModel/Models/Modal";
import LoanDataTable from "../../../components/TablesComponents/LoanDataTable";

import useActivateLoan from '../../../hooks/admin/users/loan/useActivateLoan';
import useDeleteLoan from '../../../hooks/admin/users/loan/useDeleteLoan';
import useFetchAllLoan from "../../../hooks/admin/users/loan/useFetchAllLoan";


export default function Loan() {
    const { action } = useParams();

    const { loans, loanLoading } = useFetchAllLoan();
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

    const { handleActivateDeactivate, stateloading } = useActivateLoan(closeModal);
    const { handleDelete, deleteloading } = useDeleteLoan(closeModal);

    if (action === "edit") {
        return <EditLoan />;
    }
    if (action === "credittransfer") {
        return <LoanCreditTransfers />;
    }
    if (action === "creditadjust") {
        return <LoanCreditAdjust />;
    }

    // if (action === "create") {
    //     return <AddLoan />;
    // }

    if (action === undefined || action === null) {
        return (

            <div className="row relative">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between mb-2">
                            <b>Loan</b>
                            {/* <Link to={`create`} className="btn btn-primary btn-md">
                                Add Loan
                            </Link> */}
                        </div>
                        <div className="card-body">
                            <LoanDataTable

                                distributers={Array.isArray(loans) ? loans : []}
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
                {loanLoading || deleteloading || stateloading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <ScaleLoader />
                    </div>
                )}
            </div>
        );
    }
};
