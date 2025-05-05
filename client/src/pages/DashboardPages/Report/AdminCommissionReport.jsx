
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

Modal.setAppElement('#root'); // Set the root element for accessibility

import '../../../css/modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchadmincommision } from '../../../stores/actions/reportActions';
import { useLocation, useParams } from 'react-router-dom';
import AdminCommissionDataTable from '../../../components/TablesComponents/AdminCommissionDataTable';




const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '0%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100,
    },
};
function AdminCommissionReport() {
    const location = useLocation();


    const queryParams = new URLSearchParams(location.search);

    const role = queryParams.get('role');
    const id = queryParams.get('id');



    const dispatch = useDispatch();
    const [dateRangeVisible, setDateRangeVisible] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [activeButton, setActiveButton] = useState(7);



    const handleCloseModal = () => {
        setDateRangeVisible(false);
    };

    const getSummary = () => {
        setDateRangeVisible(false);
    }

    const handleFormat = (type) => {
        setActiveButton(type);

        // Handle the Date Range visibility for type 8
        if (type === 8) {
            setDateRangeVisible(true);
        } else {
            setDateRangeVisible(false);
        }

        GetDate(type);  // Call GetDate to process the date logic
    };

    function GetDate(type) {
        let start, end;
        const today = new Date();

        switch (type) {
            case 1: // Last 6 Months
                start = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
                end = today;
                break;
            case 2: // Current Month
                start = new Date(today.getFullYear(), today.getMonth(), 1);
                end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                break;
            case 3: // Last Month
                start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                end = new Date(today.getFullYear(), today.getMonth(), 0);
                break;
            case 4: // Last Week
                let lastWeekDate = new Date(today);
                lastWeekDate.setDate(today.getDate() - 7);
                start = new Date(lastWeekDate.setHours(0, 0, 0, 0));
                end = new Date(lastWeekDate.setHours(23, 59, 59, 999));
                break;
            case 5: // Current Week
                let currentWeekDate = new Date(today);
                currentWeekDate.setDate(today.getDate() - today.getDay()); // Get the start of the week (Sunday)

                // Set the start of the week
                start = new Date(currentWeekDate);
                start.setHours(0, 0, 0, 0); // Set start time to 00:00:00

                // Set the end of the week (Saturday)
                let endDate = new Date(currentWeekDate);
                endDate.setDate(currentWeekDate.getDate() + 6); // Add 6 days to get the end of the week (Saturday)
                end = new Date(endDate);
                end.setHours(23, 59, 59, 999); // Set end time to 23:59:59

                break;

            case 6: // Yesterday
                let yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                start = new Date(yesterday.setHours(0, 0, 0, 0));
                end = new Date(yesterday.setHours(23, 59, 59, 999));
                break;
            case 7: // Today
                start = new Date(today.setHours(0, 0, 0, 0));
                end = new Date(today.setHours(23, 59, 59, 999));
                break;
            case 8: // Date Range - do not set dates here
                return; // Handling date range externally, no need for further processing here
            default:
                break;
        }

        // console.log(start, end);

        // Set start and end dates if applicable
        if (start && end) {
            setStartDate(start);
            setEndDate(end);
        }
    }


    useEffect(() => {
        dispatch(fetchadmincommision({ role, id, startDate, endDate })).unwrap();
    }, []);

    const { admincommissiondata, roles } = useSelector((state) => state.reports);
    // console.log(turnoverdata);


    // var str = "expiry;2025-04-01";
    // var encodedStr = btoa(str);  // Base64 encoding
    // console.log("Encoded:", encodedStr);
    // var decodedStr = atob(encodedStr);  // Base64 decoding
    // console.log("Decoded:", decodedStr);




    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">

                        <div className="col-md-8 col-sm-12 col-xs-12 mt-2">
                            <div className="btn-group flex-wrap">
                                <button className={`btn btn-outline-info tablinks ${activeButton === 1 ? "active" : ""} `} onClick={() => handleFormat(1)}>Last 6 Months</button>
                                <button className={`btn btn-outline-info tablinks ${activeButton === 2 ? "active" : ""} `} onClick={() => handleFormat(2)}>Current Month</button>
                                <button className={`btn btn-outline-info tablinks ${activeButton === 3 ? "active" : ""} `} onClick={() => handleFormat(3)}>Last Month</button>
                                <button className={`btn btn-outline-info tablinks ${activeButton === 4 ? "active" : ""} `} onClick={() => handleFormat(4)}>Last Week</button>
                                <button className={`btn btn-outline-info tablinks ${activeButton === 5 ? "active" : ""} `} onClick={() => handleFormat(5)}>Current Week</button>
                                <button className={`btn btn-outline-info tablinks ${activeButton === 6 ? "active" : ""} `} onClick={() => handleFormat(6)}>Yesterday</button>
                                <button className={`btn btn-outline-info tablinks ${activeButton === 7 ? "active" : ""} `} onClick={() => handleFormat(7)}>Today</button>
                                <button
                                    type="button"

                                    className={`btn btn-outline-info tablinks ${activeButton === 8 ? "active" : ""} `}
                                    onClick={() => handleFormat(8)}
                                >
                                    Date Range
                                </button>
                            </div>
                        </div>




                    </div>


                    <div className="card-body">



                        <div className="row">

                            <div className="col-md-4 col-sm-12 col-xs-12 mt-2">
                                <span className="date-display">
                                    {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                                </span>

                            </div>
                        </div>
                        <div className="row bg-light">
                            <div className="col-sm-12">
                                <table className="table table-bordered text-center data-table-top">
                                    <thead>
                                        <tr>
                                            <td className="bg-gradient-primary text-white">Total Commission Point</td>
                                            <td className="bg-gradient-danger text-white">Total Bet Point</td>
                                            <td className="bg-gradient-info text-white">Total Won Point</td>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            admincommissiondata && admincommissiondata.length > 0 && (() => {
                                                // Initialize variables
                                                let play = 0;
                                                let win = 0;

                                                let com = 0;


                                                // Loop through the data and accumulate values
                                                admincommissiondata.forEach((obj) => {
                                                    play += parseFloat(obj.totalpoints) || 0;
                                                    win += parseFloat(obj.totalwinpoints) || 0;
                                                    com += play * parseFloat(obj.winpercentage) / 100;

                                                });




                                                return (
                                                    <tr>
                                                        <td>{com.toFixed(2)}</td>
                                                        <td>{play.toFixed(2)}</td>
                                                        <td>{win.toFixed(2)}</td>

                                                    </tr>
                                                );
                                            })()
                                        }
                                    </tbody>
                                </table>

                            </div>
                        </div>




                    </div>
                    <div className='row m-2'>
                        <div className='card-header'>
                            <h4 className='text-uppercase font-bold'>

                                Admin Commission Report
                            </h4>

                        </div>
                        <div className='card-body'>
                            <AdminCommissionDataTable data={admincommissiondata} startDate={startDate} endDate={endDate} />
                        </div>

                    </div>

                </div>
            </div>
            <Modal
                isOpen={dateRangeVisible}


                onRequestClose={handleCloseModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='flex flex-row justify-between '>
                    <h2 className='text-xl font-bold'>Game Summary</h2>
                    <button className='text-2xl' onClick={handleCloseModal}><span aria-hidden="true">X</span></button>
                </div>

                <div>
                    <table className='table'>
                        <tbody>

                            <tr>
                                <td>From Date</td>
                                <td>
                                    <input
                                        type="date"
                                        value={startDate.toISOString().slice(0, 10)}
                                        onChange={(e) => setStartDate(new Date(e.target.value))}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>To Date:</td>
                                <td>
                                    <input
                                        type="date"
                                        value={endDate.toISOString().slice(0, 10)}
                                        onChange={(e) => setEndDate(new Date(e.target.value))}
                                    />
                                </td>
                            </tr>

                            <tr align="right">
                                <td>
                                    <button className='text-xl' onClick={handleCloseModal}>Close</button>
                                </td>
                                <td >
                                    <button className='btn btn-primary' onClick={getSummary}>Get Summary</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </Modal>
        </div >
    )
}

export default AdminCommissionReport;





