import $ from "jquery";
import React, { useEffect, useState } from "react";
import DataTable from "../components/TableComponents/DataTable";
import { GET } from "../utils/http";
import { useSelector } from "react-redux";
import ManagerMailDataTable from "../components/TableComponents/ManagerMailDataTable";
import Loader from "../components/ui/Loader";
const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).replace(/ /g, '-');
};
export default function ManagerMailDetails() {
    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [data, setData] = useState([]);
    const { authUser } = useSelector((state) => state.auth);

    useEffect(() => {

        setTimeout(() => {
            const $from = $("#txtFromDate");
            const $to = $("#txtToDate");
            if ($from.data('Zebra_DatePicker')) $from.data('Zebra_DatePicker').destroy();
            if ($to.data('Zebra_DatePicker')) $to.data('Zebra_DatePicker').destroy();

            const formatDate = (date) => {
                return date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                }).replace(/ /g, "-");
            };

            $from.Zebra_DatePicker({
                default_position: "below",
                show_clear_date: true,
                show_select_today: "Today",
                show_icon: true,
                format: "d-M-Y",
                pair: $to,
                onSelect: function (formatted, dateObj) {
                    setFromDate(formatted);

                    const toDateObj = new Date(dateObj);
                    toDateObj.setDate(toDateObj.getDate() + 6);

                    const formattedToDate = formatDate(toDateObj);
                    $("#txtToDate").val(formattedToDate);
                    setToDate(formattedToDate);
                },
            });

            $to.Zebra_DatePicker({
                default_position: "below",
                show_clear_date: true,
                show_select_today: "Today",
                show_icon: true,
                format: "d-M-Y",
                onSelect: function (formatted, dateObj) {
                    setToDate(formatted);

                    const fromDateObj = new Date(dateObj);
                    fromDateObj.setDate(fromDateObj.getDate() - 6);

                    const formattedFromDate = formatDate(fromDateObj);
                    $("#txtFromDate").val(formattedFromDate);
                    setFromDate(formattedFromDate);
                },
            });
            $(".Zebra_DatePicker").css({
                "background-color": "#20b7c9",
                "border-color": "#e76f51",
            });
        }, 0);

    }, []);

    const fetchData = async () => {
        try {
            // Show loading spinner
            setLoading(true);
            const response = await GET(`/playrep/mailreport?id=${authUser._id}&fromDate=${fromDate}&toDate=${toDate}`);
            if (response.response && response.response.data) {
                const rawData = response.response.data;

                setData({
                    fromDate: fromDate,
                    toDate: toDate,
                    data: Array.isArray(rawData.data) ? rawData.data : [],
                    totals: rawData.totals,
                    userFound: Array.isArray(rawData.userFound) ? rawData.userFound : [],
                });
                setLoading(false);
                // console.log(rawData);
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
    }, [])
    const loadReport = () => {
        fetchData();
    }

    // console.log(data.data);
    const demoData = [
        { SrNo: 1, AgentID: "A001", Name: "Agent 1", Profit: 1000 },
        { SrNo: 2, AgentID: "A002", Name: "Agent 2", Profit: 2000 },
        { SrNo: 3, AgentID: "A003", Name: "Agent 3", Profit: 3000 },
        { SrNo: 4, AgentID: "A004", Name: "Agent 4", Profit: 4000 },
        { SrNo: 5, AgentID: "A005", Name: "Agent 5", Profit: 5000 }
    ];

    const config = {
        fromDate,
        toDate,
        demoData: data?.data || [],
        userData: data?.userFound || [],
        columnHeaders: ['Sr. No.', 'Agent ID', 'Name', 'Profit'],
        columnAttributes: [
            { columnName: 'SrNo', dataType: 'int' },
            { columnName: 'username', dataType: 'string' },
            { columnName: 'name', dataType: 'string' },
            { columnName: 'profit', dataType: 'long' }
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
            pageSize: 10
        },
        sortSetting: {
            allowSorting: true,
            sortColumn: 'SrNo',
            sortDirection: 'asc'
        },

        onSuccess: data => console.log("Loaded successfully:", data),
        onError: err => console.error("Load failed:", err)
    };

    useEffect(() => {
        $("#txtFromDate").Zebra_DatePicker({
            default_position: "below",
            show_clear_date: true,
            show_select_today: "Today",
            show_icon: true,
            format: "d-M-Y",
            pair: $("#txtToDate"),
            onSelect: function () {
                $(".Zebra_DatePicker").css({
                    "background-color": "#20b7c9",
                    "border-color": "#e76f51",
                });
            },
        });

        $("#txtToDate").Zebra_DatePicker({
            default_position: "below",
            show_clear_date: true,
            show_select_today: "Today",
            show_icon: true,
            format: "d-M-Y",
            onSelect: function () {
                $(".Zebra_DatePicker").css({
                    "background-color": "#20b7c9",
                    "border-color": "#e76f51",
                });
            },
        });
        $(".Zebra_DatePicker").css({
            "background-color": "#20b7c9",
            "border-color": "#e76f51",
        });
    }, []);
    return (
        <>
            {/* Container */}
            <div className="container">
                <h2>Manager Mail Details</h2>
                <table style={{ width: "100%", height: "100%" }}>
                    <tr>
                        <td>
                            <div className="row-left">
                                <label htmlFor="strFromDate">From Date: </label>
                                <span className="DatePicker_Icon_Wrapper">
                                    <input id="txtFromDate" name="strFromDate" readOnly type="text" />
                                    {/* <button type="button" className="DatePicker_Icon DatePicker_Icon_Inside">Pick a date</button> */}
                                </span>
                            </div>

                            <div className="row-mid">
                                <label htmlFor="strToDate">To Date: </label>
                                <span className="DatePicker_Icon_Wrapper">
                                    <input id="txtToDate" name="strToDate" readOnly type="text" />
                                    {/* <button type="button" className="DatePicker_Icon DatePicker_Icon_Inside">Pick a date</button> */}
                                </span>
                            </div>

                            <div className="row-right show-details-button">
                                <input type="button" name="btnShowDetails" id="btnShowDetails" value="Show Details" onClick={loadReport} />
                            </div>
                        </td>
                    </tr>
                </table>
                {/* Accordion */}
                <div className="accordion">
                    {/* Adding console log for debugging */}
                    {Array.isArray(data?.data) && data.data.length > 0 && (
                        <ManagerMailDataTable {...config} />
                    )}
                </div>
                {/* Loader */}
                {loading && <Loader show={loading} />}
            </div>
        </>
    );
}
