import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners"

import AddRetailer from "../../../components/ActionModel/retailer/AddRetailer";
import EditRetailer from "../../../components/ActionModel/retailer/EditRetailer";
import RetailerCreditTransfers from "../../../components/ActionModel/retailer/RetailerCreditTransfers";
import RetailerCreditAdjust from "../../../components/ActionModel/retailer/RetailerCreditAdjust";

import Modal from "../../../components/ActionModel/Models/Modal";
import RetailerDataTable from "../../../components/TablesComponents/RetailerDataTable";

import useActivateUser from '../../../hooks/admin/users/retailers/useActivateRetailers';
import useDeleteRetailers from '../../../hooks/admin/users/retailers/useDeleteRetailers';
import useFetchAllRetailers from "../../../hooks/admin/users/retailers/useFetchAllRetailers";
import { fetchretailers } from "../../../stores/actions/retailerAction";
import { useDispatch } from "react-redux";

export default function Retailer() {
    const { action } = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchretailers());
    }, [action, dispatch])


    const { retailers, retailerLoading } = useFetchAllRetailers();
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
    const { handleDelete } = useDeleteRetailers(closeModal);
    if (action === "edit") {
        return <EditRetailer />;
    }
    if (action === "credittransfer") {
        return <RetailerCreditTransfers />;
    }
    if (action === "creditadjust") {
        return <RetailerCreditAdjust />;
    }

    if (action === "create") {
        return <AddRetailer />;
    }

    if (action === undefined || action === null) {
        return (
            <div className="row relative">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between mb-2">
                            <b>Master</b>
                            <Link to={`create`} className="btn btn-primary btn-md">
                                Add Master
                            </Link>
                        </div>
                        <div className="card-body">


                            <RetailerDataTable
                                retailers={Array.isArray(retailers) ? retailers : []}
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
                {retailerLoading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <ScaleLoader />
                    </div>
                )}
            </div>
        );
    }
};
