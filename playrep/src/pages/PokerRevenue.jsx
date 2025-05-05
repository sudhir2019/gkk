
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
export default function PokerRevenue() {
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
      setLoading(true);
      const response = await GET(`/playrep/revenuereport?id=${authUser._id}&fromDate=${fromDate}&toDate=${toDate}`);

      // Log the response to inspect its structure
      // console.log("Response:", response.response);

      // Check if response and response.data are defined before accessing them
      if (response.response && response.response.data) {
        // const result = response.response.data.data;
        // console.log("Point Transfer Report:", result);
        const rawData = response.response.data.data;
        const formattedData = rawData.map((item, index) => ({
          ...item,
          srNo: index + 1,
          fromDate: formatDate(item.fromDate),
          toDate: formatDate(item.toDate),
        }));
        setData(formattedData);
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
    { id: 1, SrNo: 1, fromdate: '2025-04-01', todate: '2025-04-07', profit: 15000, actualrevenue: 18000, revenuedead: 2000, dedpercentage: 10, revenueafterloan: 16200, revenuepercentage: 90 },
    { id: 2, SrNo: 2, fromdate: '2025-04-08', todate: '2025-04-14', profit: 12000, actualrevenue: 15000, revenuedead: 1500, dedpercentage: 8, revenueafterloan: 13500, revenuepercentage: 88 },
    { id: 3, SrNo: 3, fromdate: '2025-04-15', todate: '2025-04-21', profit: 17000, actualrevenue: 20000, revenuedead: 2500, dedpercentage: 12, revenueafterloan: 17500, revenuepercentage: 87 },
    { id: 4, SrNo: 4, fromdate: '2025-04-22', todate: '2025-04-28', profit: 20000, actualrevenue: 23000, revenuedead: 1800, dedpercentage: 9, revenueafterloan: 21200, revenuepercentage: 92 },
    { id: 5, SrNo: 5, fromdate: '2025-04-29', todate: '2025-05-05', profit: 14000, actualrevenue: 16000, revenuedead: 1000, dedpercentage: 6, revenueafterloan: 15000, revenuepercentage: 94 }
  ];
  // const calculateTotals = data => {
  //   return {
  //     profit: data.reduce((acc, item) => acc + item.profit, 0),
  //     actualRevenue: data.reduce((acc, item) => acc + item.actualRevenue, 0),
  //     commissionAmount: data.reduce((acc, item) => acc + item.commissionAmount, 0),
  //     revenueAfterCommission: data.reduce((acc, item) => acc + item.revenueAfterCommission, 0),
  //     deductionPercentage: +(data.reduce((acc, item) => acc + item.deductionPercentage, 0) / data.length).toFixed(2),
  //     //  revenuePercentage: +(data.reduce((acc, item) => acc + item.revenuePercentage, 0) / data.length).toFixed(2)
  //   };
  // };

  const config = {
    demoData,
    columnHeaders: ['Sr. No.', 'Location', 'Agent ID', 'Profit'],
    columnAttributes: [
      { columnName: 'SrNo', dataType: 'int' },
      { columnName: 'location', dataType: 'string' },
      { columnName: 'agentid', dataType: 'int' },
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
      <h2>Poker Revenue</h2>
      <table style={{ width: "100%" }}>
        <tbody>
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
                <input type="button" name="btnShowDetails" id="btnShowDetails" value="Search" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="accordion">
        {/* Adding console log for debugging */}
        {/* <DataTable {...config} /> */}
        {/* <p style={{ textAlign: "center" }}> blocked</p> */}
      </div>
      {loading && <Loader show={loading} />}
    </div>
  )
}
