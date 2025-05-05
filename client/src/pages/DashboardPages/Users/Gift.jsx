import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners"
import { useDispatch } from "react-redux";

import AddGift from "../../../components/ActionModel/gift/AddGift";
import EditGift from "../../../components/ActionModel/gift/EditGift";
import GiftCreditTransfers from "../../../components/ActionModel/gift/GiftCreditTransfers";
import GiftCreditAdjust from "../../../components/ActionModel/gift/GiftCreditAdjust";

import Modal from "../../../components/ActionModel/Models/Modal";
import GiftDataTable from "../../../components/TablesComponents/GiftDataTable";

import useActivateGift from '../../../hooks/admin/users/gift/useActivateGift';
import useDeleteGift from '../../../hooks/admin/users/gift/useDeleteGift';
import useFetchAllGift from "../../../hooks/admin/users/gift/useFetchAllGift";


export default function Gift() {
    const { action } = useParams();

    const dispatch = useDispatch();
    const { gifts, giftLoading } = useFetchAllGift();
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

    const { handleActivateDeactivate, stateloading } = useActivateGift(closeModal);
    const { handleDelete, deleteloading } = useDeleteGift(closeModal);

    if (action === "edit") {
        return <EditGift />;
    }
    if (action === "credittransfer") {
        return <GiftCreditTransfers />;
    }
    if (action === "creditadjust") {
        return <GiftCreditAdjust />;
    }

    // if (action === "create") {
    //     return <AddGift />;
    // }

    if (action === undefined || action === null) {
        return (

            <div className="row relative">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between mb-2">
                            <b>Gift</b>
                            {/* <Link to={`create`} className="btn btn-primary btn-md">
                                Add Gift
                            </Link> */}
                        </div>
                        <div className="card-body">
                            <GiftDataTable

                                distributers={Array.isArray(gifts) ? gifts : []}
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
                {giftLoading || deleteloading || stateloading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <ScaleLoader />
                    </div>
                )}
            </div>
        );
    }
};
