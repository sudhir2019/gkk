
import $ from "jquery";
import React, { useEffect, useState } from "react";
import DataTable from "../components/TableComponents/DataTable";
import { GET } from "../utils/http";
import { useSelector } from "react-redux";
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
export default function DailyStatus() {
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

            $(".Zebra_DatePicker").css({
                "background-color": "#20b7c9",
                "border-color": "#e76f51",
            });

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
            const response = await GET(`/playrep/dailystatus?id=${authUser._id}&fromDate=${fromDate}&toDate=${toDate}`);

            // Log the response to inspect its structure
            // console.log("Response:", response.response);

            // Check if response and response.data are defined before accessing them
            if (response.response && response.response.data) {
                const result = response.response.data.data;
                // console.log("Point Transfer Report:", result);
                // const rawData = response.response.data.data;

                const fresult = result.map((item, index) => ({
                    SrNo: index + 1,
                    ...item
                }));

                setData(fresult);
                setLoading(false);

                // Set state with the data if available
                // setData(result);



            } else {
                console.error("Request failed:", response.response?.data || "No data");
                setLoading(false);
            }
        } catch (error) {
            console.log("Error in fetching data:", error);
            setLoading(false);
        }
    };
    // console.log(data);
    useEffect(() => {
        fetchData();
    }, [])
    const loadReport = () => {
        fetchData();
    }

    // console.log(data);


    const demoData = [
        { agentid: 123345646456, SrNo: 1, location: 'Pune', profit: 15 },
        { agentid: 265464564556, SrNo: 2, location: 'Nashik', profit: 12 },
        { agentid: 354546454564, SrNo: 3, location: 'Mumbai', profit: 17 },
        { agentid: 454545446565, SrNo: 4, location: 'Banglore', profit: 20 },
        { agentid: 544448568898, SrNo: 5, location: 'Hyderabad', profit: 14 }
    ];

    const config = {
        demoData: data,
        columnHeaders: ['Sr. No.', 'Location', 'Agent ID', 'Profit'],
        columnAttributes: [
            { columnName: 'srNo', dataType: 'int' },
            { columnName: 'address', dataType: 'string' },
            { columnName: 'username', dataType: 'int' },
            { columnName: 'profit', dataType: 'int' },
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
        <div className="container">
            <h2>Daily Status</h2>
            <table style={{ width: "100%", height: "100%" }}>
                <div className="row-left">
                    <label htmlFor="strFromDate">Select Date : </label>
                    <span className="DatePicker_Icon_Wrapper">
                        <input id="txtFromDate" name="strFromDate" type="text" className="DatePicker_Icon_Inside" readOnly />

                    </span>
                </div>
                <div className="row-right show-details-button">
                    <input type="button" name="btnShowDetails" id="btnShowDetails" value="Show Details" onClick={loadReport} />
                </div>
            </table>
            <div className="accordion">

                <div className="accordion">
                    {data.length > 0 ? (
                        <DataTable {...config} />
                    ) : (
                        <p style={{ textAlign: "center" }}></p>
                    )}
                </div>

            </div>
            {loading && <Loader show={loading} />}
        </div>
    )
}
