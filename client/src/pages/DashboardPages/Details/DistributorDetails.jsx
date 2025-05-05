import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ScaleLoader } from "react-spinners"
import { useSelector } from 'react-redux';

import useFetchDistributorChildren from '../../../hooks/admin/chileduser/distributors/useFetchDistributorChildren';

import useActivateUser from '../../../hooks/admin/chileduser/distributors/useActivateDistributorChildren';
import useDeleteUsers from '../../../hooks/admin/chileduser/distributors/useDeleteDistributorChildren';


import DetailsDataTable from "../../../components/TablesComponents/DetailsDataTable";
import Modal from '../../../components/ActionModel/Models/Modal';

import AddDistributoesChildren from '../../../components/detailsActionModel/distributors/AddDistributoesChildren';
import EditDistributoesChildren from '../../../components/detailsActionModel/distributors/EditDistributoesChildren';
import DistributorChildrenCreditAdjust from '../../../components/detailsActionModel/distributors/DistributorChildrenCreditAdjust';
import DistributorChildrenCreditTransfers from '../../../components/detailsActionModel/distributors/DistributorChildrenCreditTransfers';


function DistributorDetails() {
  const { action, any } = useParams();
  const { authUser } = useSelector((state) => state.auth);
  const authRoute = authUser?.role;
  const { distributor, children, childrenLoading } = useFetchDistributorChildren(any);

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

  const { handleActivateDeactivate, stateloading } = useActivateUser(closeModal);
  const { handleDelete } = useDeleteUsers(closeModal);


  if (action === "edit") {
    return <EditDistributoesChildren />;
  }
  if (action === "credittransfer") {
    return <DistributorChildrenCreditTransfers />;
  }
  if (action === "creditadjust") {
    return <DistributorChildrenCreditAdjust />;
  }

  if (action === "create") {
    return <AddDistributoesChildren adminParent={distributor} />;
  }
  return (
    <div className="row">
      <div className="col-12 col-xl-12 stretch-card">
        <div className="row flex-grow">
          {/* Super Distributor Details Card */}
          <div className="col-md-3 grid-margin stretch-card">
            <div className="card">
              <div className="card-body bg-primary text-white">
                <div className="d-flex justify-content-between align-items-baseline">
                  <h6 className="card-title text-white mb-2">
                    {distributor?.role} Details</h6>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="align-items-baseline">
                      <table className="bg-transparent   w-100 rounded-2">
                        <tbody className="text-white">
                          <tr>
                            <td>
                              <p>Username:</p>
                            </td>
                            <td>
                              <p>&nbsp;{distributor?.username}</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p>Name:</p>
                            </td>
                            <td>
                              <p>&nbsp;{distributor?.username}</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Credit and Commission Points Card */}
          <div className="col-md-3 grid-margin stretch-card">
            <div className="card">
              <div className="card-body bg-success text-white">
                <div className="d-flex justify-content-between align-items-baseline">
                  <h6 className="card-title mb-1 text-white">Credit</h6>
                </div>
                <div className="row">
                  <div className="col-12">
                    <br />
                    <table className="bg-transparent w-100 rounded-2">
                      <tbody className="text-white">
                        <tr>
                          <td>
                            <p>Credit:</p>
                          </td>
                          <td>
                            <p>{distributor?.walletBalance}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Commission Point:</p>
                          </td>
                          <td>
                            <p>{distributor?.commission}</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Last Week Data Card */}
          <div className="col-md-3 grid-margin stretch-card">
            <div className="card">
              <div className="card-body bg-danger">
                <div className="d-flex justify-content-between align-items-baseline">
                  <h6 className="card-title text-white mb-2" style={{ textTransform: 'none' }}>
                    Last Week
                  </h6>
                </div>
                <div className="row">
                  <div className="col-12">
                    <br />
                    <table className="bg-transparent w-100 rounded-2">

                      <tbody className="text-white">
                        <tr>
                          <td>
                            <p>Total Played:</p>
                          </td>
                          <td>
                            <p>0.00</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Total Won:</p>
                          </td>
                          <td>
                            <p>0.00</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>End Point:</p>
                          </td>
                          <td>
                            <p>0.00</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-6 col-md-12 col-xl-7">
                  <div id="apexChart3" className="mt-md-3 mt-xl-0"></div>
                </div>
              </div>
            </div>
          </div>

          {/* This Week Data Card */}
          <div className="col-md-3 grid-margin stretch-card">
            <div className="card">
              <div className="card-body bg-orange-400">
                <div className="d-flex justify-content-between align-items-baseline">
                  <h6 className="card-title text-white mb-2" style={{ textTransform: 'none' }}>
                    This Week
                  </h6>
                </div>
                <div className="row">
                  <div className="col-12">
                    <br />
                    <table className="bg-transparent w-100 rounded-2">

                      <tbody className="text-white">
                        <tr>
                          <td>
                            <p>Total Played:</p>
                          </td>
                          <td>
                            <p>0.00</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Total Won:</p>
                          </td>
                          <td>
                            <p>0.00</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>End Point:</p>
                          </td>
                          <td>
                            <p>0.00</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-6 col-md-12 col-xl-7">
                  <div id="apexChart3" className="mt-md-3 mt-xl-0"></div>
                </div>
              </div>
            </div>
          </div>

        </div>


      </div>
      <div className="row flex-grow">
        <div className='card'>

          <div className="card-header d-flex justify-content-between mb-2 text-uppercase">
            <b>Master</b>
            <Link to={`/${authRoute}/areamanager/players/details/${any}/create`} className="btn btn-primary btn-md"> Add Masters</Link>
          </div>

          <div className='card-body'>
            <DetailsDataTable
              adminId={any}
              userLInk={`../master/players/details/`}
              editlink={`/${authRoute}/areamanager/players/${any}/edit`}
              transferlink={`/${authRoute}/areamanager/players/details/${any}/credittransfer`}
              adjustlink={`/${authRoute}/areamanager/players/details/${any}/creditadjust`}
              superdistributers={Array.isArray(children) ? children : []}
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
      {childrenLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ScaleLoader />
        </div>
      )}
    </div>
  );
}

export default DistributorDetails;
