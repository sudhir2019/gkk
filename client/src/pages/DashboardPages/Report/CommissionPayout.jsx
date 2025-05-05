import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commissionpayout } from '../../../stores/actions/reportActions';
import ComPayoutDataTable from '../../../components/TablesComponents/ComPayoutDataTable';

function CommissionPayout() {
  const dispatch = useDispatch();
  const [role, setRole] = useState(null);
  useEffect(() => {
    dispatch(commissionpayout());
  }, [role]);
  const { commissionData } = useSelector((state) => state.reports);
  const { authUser } = useSelector((state) => state.auth);
  // console.log(role);
  return (
    <div className="row">
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-header d-flex justify-content-between mb-2">
            <b>Pending Commission</b>
          </div>
          <div className="card-body">
            <div className="form-group d-flex">
              <div className="mr-2">
                <label><strong>Select Role :</strong></label>
                <div className="d-flex">
                  <select id="role" className="js-example-basic-single w-100" style={{ width: '200px' }} name="role" onChange={function changefunction(e) {
                    setRole(e.target.value);
                  }}>
                    <option value="">--Select Role--</option>
                    {
                      authUser && (authUser.role === "superadmin" || authUser.role === "admin") ? (
                        <>
                          <option value="superareamanager">Super Area Manager</option>
                          <option value="areamanager">Area Manager</option>
                          <option value="master">Master</option>
                          <option value="player">Player</option>
                        </>
                      ) : authUser && authUser.role === "superareamanager" ? (
                        <>
                          <option value="areamanager">Area Manager</option>
                          <option value="master">Master</option>
                          <option value="player">Player</option>
                        </>
                      ) : authUser && authUser.role === "areamanager" ? (
                        <>
                           <option value="master">Master</option>
                           <option value="player">Player</option>
                        </>
                      ) : authUser && authUser.role === "master" ? (
                        <option value="player">Player</option>
                      ) : null
                    }

                  </select>
                </div>
              </div>
            </div>

            <ComPayoutDataTable data={commissionData} role={role} />

          </div>
        </div>
      </div>
    </div >
  );
}

export default CommissionPayout;