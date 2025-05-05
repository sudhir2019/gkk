import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { findallusers, transactionreport } from '../../../stores/actions/reportActions';
import TransactionDataTable from '../../../components/TablesComponents/TransactionDataTable';

function TransactionReport() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findallusers());
  }, [dispatch]);

  const { allusers, transactionData } = useSelector((state) => state.reports);


  // console.log(allusers);

  // State management for form fields
  const [status, setStatus] = useState('');
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState(new Date());

  // Handle changes for 'status' and 'user_id' selects
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUserIdChange = async (e) => {
    e.preventDefault();
    const newUserId = e.target.value; // Capture the updated userId directly from the event
    setUserId(newUserId); // Update the state
    let type = "single";
    dispatch(await transactionreport({ status, userId: newUserId, date, type })).unwrap(); // Use newUserId directly in dispatch
  };

  useEffect(() => {
    let type = "all";
    dispatch(transactionreport({ status, userId: "", date, type })).unwrap();
  }, [date])






  return (
    <div className="row">
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-header d-flex justify-content-between mb-2">
            <b>Transaction Report</b>
          </div>
          <div className="card-body">
            <div className="form-group flex flex-wrap">
              <div className="mr-2">
                <label><strong>Select Date :</strong></label>
                <div className="d-flex">
                  <div className="input-group date datepicker" id="datePickerExample1">
                    <input type="date" className="form-control" name="to" id="to"
                      value={date.toISOString().slice(0, 10)}
                      onChange={(e) => setDate(new Date(e.target.value))} />
                  </div>
                </div>
              </div>

              <div className="mr-2">
                <label><strong>Filter :</strong></label>
                <div className="flex flex-wrap gap-2">
                  <select
                    id="status"
                    className="form-control mr-2"
                    style={{ width: '200px' }}
                    value={status} // bound to the state value
                    onChange={handleStatusChange} // your handler function
                  >
                    <option value="">--Select Transaction Type--</option>  {/* default option */}
                    <option value="1">Transfer</option>
                    <option value="2">Generated</option>
                  </select>

                  <select
                    className="form-control"
                    style={{ width: '200px' }}
                    value={userId}
                    onChange={(e) => handleUserIdChange(e)}
                  >
                    <option value="">--Select User--</option>
                    {
                      allusers && allusers.map((obj, index) => {
                        return (
                          <option value={obj._id} key={index}>{obj.username}</option> // Return the option element
                        );
                      })
                    }
                  </select>

                </div>
              </div>
            </div>

            <TransactionDataTable data={transactionData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionReport;