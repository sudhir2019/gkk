import React, { useEffect, useState } from "react";
import $ from "jquery";
import closebox from '../../assets/images/closebox.png';
import './PopupModal.css';
import BalanceDataTable from "../TableComponents/BalanceDataTable";
import DataTable from "../TableComponents/DataTable";
const BalanceModel = ({ modelData, isOpen, onClose }) => {
    if (!isOpen) return null;
const demoData = [
    {
        SrNo: 1,
        username: 'John Doe',
        fullName: 'John Doe',
        walletBalance: 1000,
    },
    {
        SrNo: 2,
        username: 'Jane Smith',
        fullName: 'Jane Smith',
        walletBalance: 1500,
    },
    {
        SrNo: 3,
        username: 'Bob Johnson',
        fullName: 'Bob Johnson',
        walletBalance: 800,
    },
    {
        SrNo: 4,    
        username: 'Alice Brown',
        fullName: 'Alice Brown',
        walletBalance: 1200,
    },]
    const config = {
        demoData: modelData,
        columnHeaders: ['Sr. No.', 'Child ID', 'Agent Name', 'Points'],
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
        <div className="popup-overlay">
            <span className="popup-background">
                <img src={closebox} onClick={onClose} className='close' alt="Close" />
            </span>
            <div className="popup-modal">
                <div className="table_formatting">
                    {modelData.length > 0 ? (
                        <DataTable {...config} />
                    ) : (
                        <p style={{ color: "black", fontSize: "20px", fontWeight: "bold", textAlign: "center" }}>No Data</p>
                    )}
                </div>
            </div>
        </div>


    );
};

export default BalanceModel;
