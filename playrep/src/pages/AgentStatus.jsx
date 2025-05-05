import React, { useEffect, useState } from "react";
import DataTable from "../components/TableComponents/DataTable";
import $ from "jquery";
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

export default function AgentStatus() {
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState(formatDate(new Date()));
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
      setLoading(true);
      const response = await GET(`/playrep/findstatus?id=${authUser._id}&fromDate=${fromDate}&toDate=${toDate}`);

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
  }, []);

  const loadReport = () => {
    fetchData();
  }

  const demoData = [
    { SrNo: 1, AgentName: "Agent 1", AgentID: "A1", Profit: 1000 },
    { SrNo: 2, AgentName: "Agent 2", AgentID: "A2", Profit: 2000 },
    { SrNo: 3, AgentName: "Agent 3", AgentID: "A3", Profit: 3000 },
    { SrNo: 4, AgentName: "Agent 4", AgentID: "A4", Profit: 4000 },
    { SrNo: 5, AgentName: "Agent 5", AgentID: "A5", Profit: 5000 },
  ];



  const config = {
    demoData: data,
    columnHeaders: ['Agent ID', 'Agent Name', 'Profit'],
    columnAttributes: [
      { columnName: 'username', dataType: 'string' },
      { columnName: 'name', dataType: 'string' },

      { columnName: 'profit', dataType: 'long' }
    ],
    keyColumn: 'id',
    gridStyle: {
      headerClass: 'GridHead',
      // footerClass: '',
      // footerClass: 'GridFooter',
      rowClass: 'NormalRow',
      // alternativeRowClass: 'AlternativeRow'
    },
    pageSetting: {
      allowPager: true,
      pageSize: 10
    },
    sortSetting: {
      allowSorting: true,
      sortColumn: 'id',
      sortDirection: 'asc'
    },

    onSuccess: data => console.log("Loaded successfully:", data),
    onError: err => console.error("Load failed:", err)
  };




  return (
    <div className="container">
      <h2>Agent Status</h2>
      <table style={{ width: "100%", height: "100%" }}>
        <div className="row-left">
          <label htmlFor="strFromDate">Select Date : </label>
          <span className="DatePicker_Icon_Wrapper">
            <input id="txtFromDate" name="strFromDate" type="text" className="DatePicker_Icon_Inside" value={fromDate} readOnly />
          </span>
        </div>
        <div className="row-mid">
          <label htmlFor="AgentID">Agent ID</label>
          <input id="AgentID" name="AgentID" type="text" />
        </div>
        <div className="row-right show-details-button">
          <input type="button" name="btnShowDetails" id="btnShowDetails" value="Show Details" onClick={loadReport} />
        </div>
      </table>
      <div className="accordion">

        <div className="accordion">
          <DataTable {...config} />
        </div>

      </div>
      {loading && <Loader show={loading} />}
    </div>
  )
}
