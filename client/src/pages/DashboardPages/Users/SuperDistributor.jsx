import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners"
import { Link, useParams } from "react-router-dom";

import AddSuperDistributors from "../../../components/ActionModel/superdistributors/AddSuperDistributors";
import EditSuperDistributors from "../../../components/ActionModel/superdistributors/EditSuperDistributors";
import SuperDistributorsCreditTransfers from "../../../components/ActionModel/superdistributors/SuperDistributorsCreditTransfers";
import SuperDistributorsCreditAdjust from "../../../components/ActionModel/superdistributors/SuperDistributorsCreditAdjust";

import Modal from "../../../components/ActionModel/Models/Modal";
import SuperDistributorDataTable from "../../../components/TablesComponents/SuperDistributorDataTable";

import useDeleteSuperDistributor from '../../../hooks/admin/users/superdistributors/useDeleteSuperDistributor';
import useActivateSuperDistributors from '../../../hooks/admin/users/superdistributors/useActivateSuperDistributors';
import useFetchAllSuperDistributors from "../../../hooks/admin/users/superdistributors/useFetchAllSuperDistributor";
import { useDispatch } from "react-redux";
import { fetchsuperdistributorss } from "../../../stores/actions/superDistributorAction";

const SuperDistributor = () => {
    const { action } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchsuperdistributorss());
    }, [action, dispatch])

    const { superdistributors, superdistributorsLoading } = useFetchAllSuperDistributors();
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
    }
    const { handleDelete } = useDeleteSuperDistributor(closeModal);
    const { handleActivateDeactivate } = useActivateSuperDistributors(closeModal);


    if (action === "edit") {
        return <EditSuperDistributors />;
    }
    if (action === "credittransfer") {
        return <SuperDistributorsCreditTransfers />;
    }
    if (action === "creditadjust") {
        return <SuperDistributorsCreditAdjust />;
    }

    if (action === "create") {
        return <AddSuperDistributors />;
    }

    if (action === undefined || action === null) {
        return (
            <div className="row relative">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between mb-2">
                            <b>Super Area Manager</b>
                            <Link to={`create`} className="btn btn-primary btn-md">
                                Add Super Area Manager
                            </Link>
                        </div>
                        <div className="card-body">
                            <SuperDistributorDataTable
                                editlink={'edit'}
                                transferlink={"credittransfer"}
                                adjustlink={"creditadjust"}
                                superdistributers={Array.isArray(superdistributors) ? superdistributors : []}
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
                {superdistributorsLoading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <ScaleLoader />
                    </div>
                )}
            </div>
        );
    }
};

export default SuperDistributor;
