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
export default function AgentMailDetails() {
    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [data, setData] = useState([]);
    const [totals, setTotals] = useState({});
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

    const userList = Array.isArray(data?.data) ? data.data : [];


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
                <h2>Agent Mail Details</h2>
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
                    <div className="table_formatting">


                        <h3 style={{ color: 'black', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>From {formatDate(fromDate)} to {formatDate(toDate)}</h3>
                        <div>Your Members Played in Other Agents CyberCafe</div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Member Id</th>
                                    <th>Member Name</th>
                                    <th>Play</th>
                                    <th>Reg</th>
                                    <th>Points Used By The Member</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userList.map((userdata, index) => (
                                    <tr key={index}>
                                        <td>{userdata.username}</td>
                                        <td>MP Gift ID</td>
                                        <td>2000 ANDROID Game</td>
                                        <td>13212</td>
                                        <td>{userdata.profit}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr><td colSpan="5">Total Point Used : {data?.totals?.totalProfit}</td></tr>
                            </tfoot>
                        </table>

                        <div>Total Points Used</div>
                        <table>
                            <thead>
                                <tr><th>Type</th><th>Total Points</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Your Members Played in Other Agents CyberCafe</td><td>{data?.totals?.totalProfit}</td></tr>
                            </tbody>
                            <tfoot>
                                <tr><td colSpan="2">Total Point Used : {data?.totals?.totalProfit}</td></tr>
                            </tfoot>
                        </table>

                        <div className="DetailsDiv">
                            <p>In this week your revenue is at <span style={{ color: '#CC3300' }}>{data?.totals?.totalProfit < 0 ? 0 : data?.totals?.usercommission}%</span></p>
                            <p>Due to earning in this week, the company would able to provide you <span style={{ color: '#CC3300' }}>

                                {data?.totals?.totalProfit < 0 ? "0" : data?.totals?.totalProfit * data?.totals?.usercommission / 100}

                            </span> points as a gift</p>
                            <p>0% of your points are being deducted with respect to your loan towards the company.</p>
                            <p>Previous Loan : 0</p>
                            <p>Actual Points : {data?.totals?.totalProfit}</p>
                            <p>Deducted Points : 0</p>
                            <p>Loan Remaining : No Record Found</p>
                        </div>
                    </div>
                </div>
                {/* Loader */}
                {loading && <Loader show={loading} />}
            </div>
        </>
    );
}
