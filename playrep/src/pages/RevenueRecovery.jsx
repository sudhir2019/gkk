import React, { useEffect, useState } from "react";
import DataTable from "../components/TableComponents/DataTable";
import Loader from "../components/ui/Loader";
import $ from "jquery";
import { GET } from "../utils/http";
import { useSelector } from "react-redux";
export default function RevenueRecovery() {
    // const demoData = [
    //     { id: 1, SrNo: 1, agentid: 'A001', revenue: '50000', losscompany: '20000' },
    //     { id: 2, SrNo: 2, agentid: 'A002', revenue: '60000', losscompany: '25000' },
    //     { id: 3, SrNo: 3, agentid: 'A003', revenue: '70000', losscompany: '30000' },
    //     { id: 4, SrNo: 4, agentid: 'A004', revenue: '80000', losscompany: '35000' },
    //     { id: 5, SrNo: 5, agentid: 'A005', revenue: '90000', losscompany: '40000' },
    //     { id: 6, SrNo: 6, agentid: 'A006', revenue: '100000', losscompany: '45000' },
    //     { id: 7, SrNo: 7, agentid: 'A007', revenue: '110000', losscompany: '50000' },
    //     { id: 8, SrNo: 8, agentid: 'A008', revenue: '120000', losscompany: '55000' },
    //     { id: 9, SrNo: 9, agentid: 'A009', revenue: '130000', losscompany: '60000' },
    // ];
    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [data, setData] = useState([]);
    const { authUser } = useSelector((state) => state.auth);

    const demoData = []

    const config = {
        demoData: data,
        columnHeaders: ['Sr. No.', 'Agent ID', 'Revenue %', 'Loss to Company'],
        columnAttributes: [
            { columnName: 'SrNo', dataType: 'int' },
            { columnName: 'agentid', dataType: 'date' },
            { columnName: 'revenue', dataType: 'string' },
            { columnName: 'losscompany', dataType: 'string' },
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
        <>
            {/* Container */}
            <div className="container">
                <h2>Revenue Recovery</h2>
                <table style={{ width: "100%", height: "100%" }}>
                    <div className="row-mid">
                        <label htmlFor="AgentID">Agent ID</label>
                        <input id="AgentID" name="AgentID" type="text" />
                    </div>
                    <div className="row-right search-button">
                        <input type="button" name="btnSearch" id="btnSearch" value="Search" />
                    </div>
                </table>
                {/* Accordion */}
                <div className="accordion">
                    {data.length > 0 ? (
                        <DataTable {...config} />
                    ) : (
                        <p style={{ textAlign: "center" }}></p>
                    )}
                </div>
                {loading && <Loader show={loading} />}
            </div>
        </>
    );
}
