import React from 'react';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import 'font-awesome/css/font-awesome.min.css';

const ComPayoutDataTable = ({ data, role }) => {
    // Filter the data based on the role
    const filteredData = role ? data.filter(user => user.role === role) : data;

    // Define the columns for your DataTable
    const columns = [
        {
            name: 'No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '60px',
        },

        {
            name: 'Username',
            selector: row => row.username,
            width: '140px',
            sortable: true,
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true,
        },
        {
            name: 'Percentage',
            selector: row => row.commission,
            sortable: true,
        },
        {
            name: 'Total Commission',
            selector: row => parseFloat(row.totalcommission, 2) * parseFloat(row.commission, 2) / 100,
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
        const exportData = filteredData.map(user => ({
            'User ID': user.id,
            Username: user.username,
            Commission: user.commission,
            'Total Commission': user.totalcommission,
        }));

        // Convert the data to a worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);

        // Create a new workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Payout Data');

        // Export to Excel
        XLSX.writeFile(wb, 'PayoutData.xlsx');
    };

    return (
        <div className="container-fluid">
            {/* Optional export button */}
            {/* <button className="btn btn-primary mb-3" onClick={handleExport}>
        <i className="fas fa-file-excel"></i> Export to Excel
      </button> */}

            <div className="table-responsive">
                <DataTable
                    columns={columns}
                    data={filteredData} // Use filtered data here
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

export default ComPayoutDataTable;