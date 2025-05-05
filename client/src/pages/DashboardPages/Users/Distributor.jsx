import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners"

import AddDistributors from "../../../components/ActionModel/distributors/AddDistributors";
import EditDistributors from "../../../components/ActionModel/distributors/EditDistributors";
import DistributorsCreditTransfers from "../../../components/ActionModel/distributors/DistributorsCreditTransfers";
import DistributorsCreditAdjust from "../../../components/ActionModel/distributors/DistributorsCreditAdjust";

import Modal from "../../../components/ActionModel/Models/Modal";
import DistributorDataTable from "../../../components/TablesComponents/DistributorDataTable";

import useActivateDistributors from '../../../hooks/admin/users/distributors/useActivateDistributors';
import useDeleteDistributor from '../../../hooks/admin/users/distributors/useDeleteDistributor';
import useFetchAllDistributor from "../../../hooks/admin/users/distributors/useFetchAllDistributor";
import { fetchdistributorss } from "../../../stores/actions/distributorAction";
import { useDispatch } from "react-redux";

export default function Distributor() {
    const { action } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchdistributorss());
    }, [action, dispatch])


    const { distributors, distributorsLoading } = useFetchAllDistributor();
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

    const { handleActivateDeactivate, stateloading } = useActivateDistributors(closeModal);
    const { handleDelete, deleteloading } = useDeleteDistributor(closeModal);

    if (action === "edit") {
        return <EditDistributors />;
    }
    if (action === "credittransfer") {
        return <DistributorsCreditTransfers />;
    }
    if (action === "creditadjust") {
        return <DistributorsCreditAdjust />;
    }

    if (action === "create") {
        return <AddDistributors />;
    }

    if (action === undefined || action === null) {
        return (

            <div className="row relative">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between mb-2">
                            <b>Area Manager</b>
                            <Link to={`create`} className="btn btn-primary btn-md">
                                Add Area Manager
                            </Link>
                        </div>
                        <div className="card-body">
                            <DistributorDataTable

                                distributers={Array.isArray(distributors) ? distributors : []}
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
                {distributorsLoading || deleteloading || stateloading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <ScaleLoader />
                    </div>
                )}
            </div>
        );
    }
};
