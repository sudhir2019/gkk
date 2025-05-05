import React, { useEffect, useState } from "react";
import DataTable from "../components/TableComponents/DataTable";
import Loader from "../components/ui/Loader";
import { GET } from "../utils/http";
import { useSelector } from "react-redux";

export default function AgentDetails() {

    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [data, setData] = useState([]);
    const { authUser } = useSelector((state) => state.auth);


    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await GET(`/playrep/agentdetails?id=${authUser._id}&fromDate=${fromDate}&toDate=${toDate}`);

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

                setLoading(false);
                setData(fresult);

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




    const demoData = [
        { agentid: 123345646456, SrNo: 1, agentlocation: 'Pune', profitshere: 15 },
        { agentid: 265464564556, SrNo: 2, agentlocation: 'Nashik', profitshere: 12 },
        { agentid: 354546454564, SrNo: 3, agentlocation: 'Mumbai', profitshere: 17 },
        { agentid: 454545446565, SrNo: 4, agentlocation: 'Banglore', profitshere: 20 },
        { agentid: 544448568898, SrNo: 5, agentlocation: 'Hyderabad', profitshere: 14 }
    ];



    const config = {
        demoData: data,
        columnHeaders: ['Sr. No.', 'Agent ID', 'Agent LOCATION', 'Profit Shere'],
        columnAttributes: [
            { columnName: 'SrNo', dataType: 'int' },
            { columnName: 'username', dataType: 'date' },
            { columnName: 'address', dataType: 'string' },
            { columnName: 'commission', dataType: 'int' },
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
                <h2>Agent Details</h2>
                <table style={{ width: "100%", height: "100%" }}>
                </table>
                {/* Accordion */}
                <div className="accordion">
                    {/* {data.length > 0 ? ( */}
                    <DataTable {...config} />
                    {/* // ) : (
                    //     <p style={{ textAlign: "center" }}></p>
                    // )} */}
                </div>
                {loading && <Loader show={loading} />}
            </div>
        </>
    );
}
