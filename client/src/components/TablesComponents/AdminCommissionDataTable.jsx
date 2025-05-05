import React from 'react';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import 'font-awesome/css/font-awesome.min.css';

const AdminCommissionDataTable = ({ data, startDate, endDate }) => {

    // Define the columns for your DataTable
    const columns = [
        {
            name: 'No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '60px',
        },
        {
            name: 'Game ID',
            selector: row => row.gameId,
            sortable: true,
        },
        {
            name: 'Game Name',
            selector: row => row.gameName,
            sortable: true,
            width: "150px",
        },
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
        },


        {
            name: 'Commission Amount',
            selector: row => row.totalpoints * row.winpercentage / 100,
            sortable: true,
        },
        {
            name: 'Total Points',
            selector: row => row.totalpoints,
            sortable: true,
        },
        {
            name: 'Total Win Points',
            selector: row => row.totalwinpoints,
            sortable: true,
        },
    ];

    // DataTable configuration
    const tableOptions = {
        pagination: true,
        highlightOnHover: true,
        responsive: true,
        selectableRows: false,
        sortIcon: <i className="fas fa-sort"></i>,
    };

    // Handle the export functionality
    const handleExport = () => {
        // Extract necessary data for export
        const exportData = data.map(item => ({
            'Game Name': item.gameName,
            'Username': item.username,
            'Game ID': item.gameId,
            'No. of Digits': item.nofDigit,
            'Win Percentage': item.winpercentage,
            'Total Points': item.totalpoints,
            'Total Win Points': item.totalwinpoints,
        }));

        // Convert the data to a worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);

        // Create a new workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'AdminCommissionData');

        // Export to Excel
        XLSX.writeFile(wb, 'AdminCommissionData.xlsx');
    };

    return (
        <div className="container-fluid">
            {/* Export Button */}
            <button className="btn btn-primary mb-3" onClick={handleExport}>
                <i className="fas fa-file-excel"></i> Excel
            </button>

            {/* DataTable Component */}
            <div className="table-responsive">
                <DataTable
                    columns={columns}
                    data={data}
                    {...tableOptions} // Spread tableOptions for additional configurations
                    customStyles={{
                        table: {
                            style: {
                                border: '1px solid #dee2e6',
                            },
                        },
                        headRow: {
                            style: {
                                borderBottom: '2px solid #dee2e6',
                            },
                        },
                        headCells: {
                            style: {
                                borderRight: '1px solid #dee2e6',
                            },
                        },
                        cells: {
                            style: {
                                borderRight: '1px solid #dee2e6',
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default AdminCommissionDataTable;