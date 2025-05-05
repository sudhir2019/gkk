import React, { useEffect, useState } from "react";
import $ from "jquery";
import { GET } from "../utils/http";
import { useSelector } from "react-redux";
import BalanceDataTable from "../components/TableComponents/BalanceDataTable";
import Loader from "../components/ui/Loader";

export default function BalanceReport() {

    const [loading, setLoading] = useState(false);
    const [agentId, setAgentId] = useState('');

    const [data, setData] = useState([]);
    const { authUser } = useSelector((state) => state.auth);


    const fetchData = async () => {
        try {
            // Show loading spinner
            setLoading(true);
            const response = await GET(`/playrep/balancereport?id=${authUser._id}&agentId=${agentId}`);

            // Log the response to inspect its structure
            // console.log("Response:", response.response);

            // Check if response and response.data are defined before accessing them
            if (response.response && response.response.data) {
                const result = response.response.data.data;
                // console.log("Point Transfer Report:", result);
                // const rawData = response.response.data.data;

                const fresult = result.map((item, index) => ({
                    SrNo: index + 1,
                    ...item,
                    fullName: `${item.firstName || ''} ${item.lastName || ''}`.trim()
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
        const filtered = data.filter((row) => row.username === agentId);
        setData(filtered);
    };


    const demoData = [
        { id: 1, SrNo: 1, agentid: 'A001', agentname: 'John Doe', points: 1000 },
        { id: 2, SrNo: 2, agentid: 'A002', agentname: 'Jane Smith', points: 1500 },
        { id: 3, SrNo: 3, agentid: 'A003', agentname: 'Bob Johnson', points: 800 },
        { id: 4, SrNo: 4, agentid: 'A004', agentname: 'Alice Williams', points: 1200 },
        { id: 5, SrNo: 5, agentid: 'A005', agentname: 'Mike Brown', points: 900 },
        { id: 6, SrNo: 6, agentid: 'A006', agentname: 'Emily Davis', points: 1100 },
        { id: 7, SrNo: 7, agentid: 'A007', agentname: 'David Wilson', points: 1300 },
    ];

    const config = {
        demoData: data,
        columnHeaders: ['Sr. No.', 'Agent ID', 'Agent Name', 'Points'],
        columnAttributes: [
            { columnName: 'SrNo', dataType: 'int' },
            { columnName: 'username', dataType: 'date' },
            { columnName: 'fullName', label: 'Full Name', dataType: 'string' },
            { columnName: 'walletBalance', dataType: 'int' },
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

    return (
        <>
            {/* Container */}
            <div className="container">
                <h2>Balance Report</h2>
                <table style={{ width: "100%", height: "100%" }}>
                    <div className="row-mid">
                        <label htmlFor="AgentID">Agent ID</label>
                        <input id="AgentID" name="AgentID" type="text" value={agentId} onChange={(e) => setAgentId(e.target.value)} autoComplete="off" />
                    </div>
                    <div className="row-right search-button">
                        <input type="button" name="btnSearch" id="btnSearch" value="Search" onClick={loadReport} />
                    </div>
                </table>
                {/* Accordion */}
                <div className="accordion">
                    {/* Adding console log for debugging */}
                    {data.length > 0 ? (
                        <BalanceDataTable {...config} />
                    ) : (
                        <p style={{ textAlign: "center" }}></p>
                    )}
                </div>
                {/* Loader */}
                {loading && <Loader show={loading} />}
            </div>
        </>
    );
}
