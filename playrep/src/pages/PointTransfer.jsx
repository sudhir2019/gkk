import React, { useEffect, useState } from "react";
import $ from "jquery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/ui/Loader";
import DataTable from "../components/TableComponents/DataTable";
import { GET } from "../utils/http";
import { useSelector } from "react-redux";
import TransferDataTable from "../components/TableComponents/TransferDataTable";
import TransferredNotReceivedDataTable from "../components/TableComponents/transferredNotReceivedDataTable";
import ReceivedDataTable from "../components/TableComponents/ReceivedDataTable";
import YetToBeReceivedDataTable from "../components/TableComponents/YetToBeReceivedDataTable";
import CancelledDataTable from "../components/TableComponents/CancelledDataTable";
import RejectedDataTable from "../components/TableComponents/RejectedDataTable";


const PointTransfer = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const tableAccordian = ["Point Transferred", "Points Transferred But yet to be Received", "Points Received", "Points yet to be Received", "Points Rejected", "Points Cancelled"];
    const { authUser } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [transferred, setTransferred] = useState([]);
    const [transferredNotReceived, setTransferredNotReceived] = useState([]);
    const [received, setReceived] = useState([]);
    const [yetToBeReceived, setYetToBeReceived] = useState([]);
    const [rejected, setRejected] = useState([]);
    const [cancelled, setCancelled] = useState([]);



    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await GET(`/playrep/pointtransferreport?id=${authUser._id}&fromDate=${fromDate}&toDate=${toDate}`);

            // Log the response to inspect its structure
            // console.log("Response:", response.response);

            // Check if response and response.data are defined before accessing them
            if (response.response && response.response.data && response.response.data.success) {
                const result = response.response.data.data;
                // console.log("Point Transfer Report:", result);

                // Set state with the data if available
                setTransferred(result.transferred || []);
                setTransferredNotReceived(result.transferredNotReceived || []);
                setReceived(result.received || []);
                setYetToBeReceived(result.yetToBeReceived || []);
                setRejected(result.rejected || []);
                setCancelled(result.cancelled || []);
                setLoading(false);
            } else {
                console.error("Request failed:", response.response?.data || "No data");
                setLoading(false);
            }
        } catch (error) {
            console.log("Error in fetching data:", error);
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
        setTimeout(() => {
            const $from = $("#txtFromDate");
            const $to = $("#txtToDate");

            if ($from.data('Zebra_DatePicker')) $from.data('Zebra_DatePicker').destroy();
            if ($to.data('Zebra_DatePicker')) $to.data('Zebra_DatePicker').destroy();

            $(".Zebra_DatePicker").css({
                "background-color": "#20b7c9",
                "border-color": "#e76f51",
            });


            $from.Zebra_DatePicker({
                default_position: "below",
                show_clear_date: true,
                show_select_today: "Today",
                show_icon: true,
                format: "d-M-Y",
                pair: $to,
                onSelect: function (formatted) {
                    $(".Zebra_DatePicker").css({
                        "background-color": "#20b7c9",
                        "border-color": "#e76f51",
                    });

                    setFromDate(formatted);
                },
            });

            $to.Zebra_DatePicker({
                default_position: "below",
                show_clear_date: true,
                show_select_today: "Today",
                show_icon: true,
                format: "d-M-Y",
                onSelect: function (formatted) {
                    setToDate(formatted);
                },
            });
            $(".Zebra_DatePicker").css({
                "background-color": "#20b7c9",
                "border-color": "#e76f51",
            });
        }, 0); // Delay to ensure inputs are rendered
    }, []);


    const [openSection, setOpenSection] = useState("section0");
    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };
    // Sample configuration for the DataTable




    const demoData = [
        { id: 1, SrNo: 1, TransferredTo: 'Ravi Kumar', Type: 'Credit', Amount: 500, TransferTime: '2025-04-01 14:30:00' },
        { id: 2, SrNo: 2, TransferredTo: 'Anjali Sharma', Type: 'Debit', Amount: 200, TransferTime: '2025-04-02 09:45:00' },
        { id: 3, SrNo: 3, TransferredTo: 'Suresh Mehta', Type: 'Credit', Amount: 1000, TransferTime: '2025-04-03 18:15:00' },
        { id: 4, SrNo: 4, TransferredTo: 'Meena Jain', Type: 'Debit', Amount: 150, TransferTime: '2025-04-04 11:00:00' },
        { id: 5, SrNo: 5, TransferredTo: 'Ajay Singh', Type: 'Credit', Amount: 750, TransferTime: '2025-04-05 16:20:00' },
        { id: 6, SrNo: 6, TransferredTo: 'Kavita Joshi', Type: 'Debit', Amount: 300, TransferTime: '2025-04-06 08:55:00' },
        { id: 7, SrNo: 7, TransferredTo: 'Ramesh Gupta', Type: 'Credit', Amount: 900, TransferTime: '2025-04-07 10:30:00' },
        { id: 8, SrNo: 8, TransferredTo: 'Priya Patel', Type: 'Debit', Amount: 250, TransferTime: '2025-04-08 12:10:00' },
        { id: 9, SrNo: 9, TransferredTo: 'Arjun Verma', Type: 'Credit', Amount: 400, TransferTime: '2025-04-09 15:45:00' },
        { id: 10, SrNo: 10, TransferredTo: 'Sneha Reddy', Type: 'Debit', Amount: 100, TransferTime: '2025-04-10 09:20:00' },
    ];




    const config = {
        demoData,
        columnHeaders: ['Sr. No.', 'Transferred To', 'Type', 'Amount', 'Transfer Time'],
        columnAttributes: [
            { columnName: 'SrNo', dataType: 'int' },
            { columnName: 'TransferredTo', dataType: 'string' },
            { columnName: 'Type', dataType: 'string' },
            { columnName: 'Amount', dataType: 'long' },
            { columnName: 'TransferTime', dataType: 'string' },
        ],
        keyColumn: 'id',
        gridStyle: {
            headerClass: 'GridHead',
            footerClass: 'GridFooter',
            rowClass: 'NormalRow',
            alternativeRowClass: 'AlternativeRow'
        },
        pageSetting: {
            allowPager: true,
            pageSize: 3
        },
        sortSetting: {
            allowSorting: true,
            sortColumn: 'SrNo',
            sortDirection: 'asc'
        },

        onSuccess: data => console.log("Loaded successfully:", data),
        onError: err => console.error("Load failed:", err)
    };

    return (

        <div className="container">
            <h2>Point Transfer</h2>
            <table style={{ width: "100%" }}>
                <tbody>
                    <tr>
                        <td>
                            <div className="row-left">
                                <label htmlFor="strFromDate">From Date: </label>
                                <span className="DatePicker_Icon_Wrapper">
                                    <input
                                        id="txtFromDate"
                                        name="strFromDate"
                                        type="text"
                                        value={fromDate}
                                        readOnly
                                    />

                                </span>
                            </div>

                            <div className="row-mid">
                                <label htmlFor="strToDate">To Date: </label>
                                <span className="DatePicker_Icon_Wrapper">
                                    <input
                                        id="txtToDate"
                                        name="strToDate"
                                        type="text"
                                        value={toDate}
                                        readOnly
                                    />

                                </span>
                            </div>

                            <div className="row-mid">
                                <label htmlFor="MemberID">Member ID</label>
                                <input id="txtMemberID" name="MemberID" type="text" />
                            </div>

                            <div className="row-right show-details-button">
                                <input type="button" name="btnShowDetails" id="btnShowDetails" value="Show Details" onClick={fetchData} />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Accordion */}
            <div className="accordion">
                {tableAccordian.map((title, index) => {
                    const sectionId = `section${index}`;
                    return (
                        <div key={sectionId}>
                            <h3
                                className={`accordion-header ${openSection === sectionId ? "active" : ""}`}
                                onClick={() => toggleSection(sectionId)}
                            >
                                {openSection === sectionId ? (
                                    <FontAwesomeIcon icon={faCaretDown} />
                                ) : (
                                    <FontAwesomeIcon icon={faCaretRight} />
                                )}
                                &nbsp;
                                {title}
                            </h3>
                            <div
                                className="accordion-content"
                                style={{ display: openSection === sectionId ? "block" : "none" }}
                            >

                                {transferred.length > 0 && title === "Point Transferred" && (
                                    <TransferDataTable {...{ ...config, demoData: transferred }}
                                    />
                                )}

                                {transferredNotReceived.length > 0 && title === "Points Transferred But yet to be Received" && (
                                    <TransferredNotReceivedDataTable {...{ ...config, demoData: transferredNotReceived }} />
                                )}
                                {received.length > 0 && title === "Points Received" && (
                                    <ReceivedDataTable {...{ ...config, demoData: received }} />
                                )}
                                {yetToBeReceived.length > 0 && title === "Points yet to be Received" && (
                                    <YetToBeReceivedDataTable {...{ ...config, demoData: yetToBeReceived }} />
                                )}
                                {rejected.length > 0 && title === "Points Rejected" && (
                                    <RejectedDataTable {...{ ...config, demoData: rejected }} />
                                )}
                                {cancelled.length > 0 && title === "Points Cancelled" && (
                                    <CancelledDataTable {...{ ...config, demoData: cancelled }} />
                                )}


                            </div>
                        </div>
                    );
                })}
            </div>
            {loading && <Loader show={loading} />}
        </div>

    );
};

export default PointTransfer;