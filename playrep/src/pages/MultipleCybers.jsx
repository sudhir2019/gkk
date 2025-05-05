import React, { useEffect, useState } from "react";
import DataTable from "../components/TableComponents/DataTable";
import $ from "jquery";
import { GET } from "../utils/http";
import { useSelector } from "react-redux";
import Loader from "../components/ui/Loader";

export default function MultipleCybers() {
    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [data, setData] = useState([]);
    const { authUser } = useSelector((state) => state.auth);


    const demoData = [
        { id: 1, SrNo: 1, agentid: 'A001', totalloan: '50000', processingloan: '20000', daysfromlastdeduction: 30 },
        { id: 2, SrNo: 2, agentid: 'A002', totalloan: '60000', processingloan: '25000', daysfromlastdeduction: 45 },
        { id: 3, SrNo: 3, agentid: 'A003', totalloan: '70000', processingloan: '30000', daysfromlastdeduction: 60 },
        { id: 4, SrNo: 4, agentid: 'A004', totalloan: '80000', processingloan: '35000', daysfromlastdeduction: 75 },
        { id: 5, SrNo: 5, agentid: 'A005', totalloan: '90000', processingloan: '40000', daysfromlastdeduction: 90 },
        { id: 6, SrNo: 6, agentid: 'A006', totalloan: '100000', processingloan: '45000', daysfromlastdeduction: 105 },
        { id: 7, SrNo: 7, agentid: 'A007', totalloan: '110000', processingloan: '50000', daysfromlastdeduction: 120 },
    ];

    const config = {
        demoData: data,
        columnHeaders: ['Sr. No.', 'Agent ID', 'total loan', 'Prossing loan', 'Days from Last Deduction'],
        columnAttributes: [
            { columnName: 'SrNo', dataType: 'int' },
            { columnName: 'agentid', dataType: 'date' },
            { columnName: 'totalloan', dataType: 'string' },
            { columnName: 'processingloan', dataType: 'string' },
            { columnName: 'daysfromlastdeduction', dataType: 'int' },
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
                <h2>Multiple Cybers</h2>
                <table style={{ width: "100%", height: "100%" }}>
                </table>
                {/* Accordion */}
                <div className="accordion">
                    {/* Adding console log for debugging */}
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
