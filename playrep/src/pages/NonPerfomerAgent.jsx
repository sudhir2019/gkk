import React, { useEffect, useState } from "react";
import DataTable from "../components/TableComponents/DataTable";
import $ from "jquery";
import { GET } from "../utils/http";
import { useSelector } from "react-redux";
import Loader from "../components/ui/Loader";

export default function NonPerfomerAgent() {
    const [loading, setLoading] = useState(false);
    const [totalAgents, setTotalUsers] = useState(0);
    const [nonPerformerAgent, setNonPerformerAgent] = useState(0);


    const [data, setData] = useState([]);
    const { authUser } = useSelector((state) => state.auth);


    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await GET(`/playrep/balancereport?id=${authUser._id}&agentId=""`);

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
                    agentname: `${item.firstName || ''} ${item.lastName || ''}`.trim()
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
    };




    const demoData = [
        { id: 1, SrNo: 1, agentid: 'A001', agentname: 'John Doe' },
        { id: 2, SrNo: 2, agentid: 'A002', agentname: 'Jane Smith' },
        { id: 3, SrNo: 3, agentid: 'A003', agentname: 'Bob Johnson' },
        { id: 4, SrNo: 4, agentid: 'A004', agentname: 'Alice Williams' },
        { id: 5, SrNo: 5, agentid: 'A005', agentname: 'Mike Brown' },
        { id: 6, SrNo: 6, agentid: 'A006', agentname: 'Emily Davis' },
        { id: 7, SrNo: 7, agentid: 'A007', agentname: 'David Wilson' },
        { id: 8, SrNo: 8, agentid: 'A008', agentname: 'Sarah Johnson' },
    ];

    const config = {
        demoData: data,
        columnHeaders: ['Sr. No.', 'Agent ID', 'Agent Name'],
        columnAttributes: [
            { columnName: 'SrNo', dataType: 'int' },
            { columnName: 'username', dataType: 'date' },
            { columnName: 'agentname', dataType: 'string' },
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

    const nonperfo = data && data.filter((row) => row.userStatus === false);
    return (
        <>
            {/* Container */}
            <div className="container">
                <h2>Non Performing CCS</h2>
                <table style={{ width: "100%", height: "100%" }}>
                    <label htmlFor="AgentID">Total Agent : </label>
                    <input id="AgentID" name="AgentID" type="button" value={data.length} readOnly />

                    <label htmlFor="AgentID">Non Performing Count : </label>
                    <input id="AgentID" name="AgentID" type="button" value={nonperfo.length} readOnly />
                </table>
                {/* Accordion */}
                <div className="accordion">
                    {/* Adding console log for debugging */}
                    <DataTable {...config} />
                </div>
                {loading && <Loader show={loading} />}
            </div>
        </>
    );
}
