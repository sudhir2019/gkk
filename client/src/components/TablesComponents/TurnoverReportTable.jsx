import React from 'react';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import 'font-awesome/css/font-awesome.min.css';

const TurnoverReportTable = ({ data, startDate, endDate }) => {
    // Define the columns for the DataTable
    const columns = [
        {
            name: 'No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '60px',
        },
        {
            name: 'ID',
            selector: (row) => (
                <a href={`?role=${row.role}&id=${row.id}&startDate=${startDate}&endDate=${endDate}`}>{row.username} <i className='fa fa-eye' style={{ color: "blue" }}></i></a>
            ),
            width: '150px',
            sortable: true,
        },
        {
            name: 'Play Points',
            selector: (row) => row.playPoints,
            width: '150px',
            sortable: true,
        },
        {
            name: 'Win Points',
            selector: (row) => row.winPoints,
            sortable: true,
        },
        {
            name: 'End Points',
            selector: (row) => row.endPoints,
            sortable: true,
        },
        {
            name: 'Super Commission',
            selector: (row) => row.supercom,
            sortable: true,
        },
        {
            name: 'Areamanager Commission',
            selector: (row) => row.distcom,
            sortable: true,
        },
        {
            name: 'Master Commission',
            selector: (row) => row.retailcom,
            sortable: true,
        },
        {
            name: 'Net',
            selector: (row) => row.net,
            sortable: true,
        }
    ];

    // Function to calculate sums for numeric columns
    const calculateSums = () => {
        let sums = {
            playPoints: 0,
            winPoints: 0,
            endPoints: 0,
            supercom: 0,
            distcom: 0,
            retailercom: 0,
            net: 0,
        };

        data.forEach(row => {
            sums.playPoints += row.playPoints || 0;
            sums.winPoints += row.winPoints || 0;
            sums.endPoints += row.endPoints || 0;
            sums.supercom += row.supercom || 0;
            sums.distcom += row.distcom || 0;
            sums.retailercom += row.retailcom || 0;
            sums.net += row.net || 0;
        });

        return sums;
    };

    // Get the sums of the numeric columns
    const sums = calculateSums();

    // Handle the export functionality
    const handleExport = () => {
        const exportData = data.map(data => ({
            'UserName': data.username,
            'Play Points': data.playPoints,
            'Win Points': data.winPoints,
            'End Points': data.endPoints,
            'Super Commission': data.supercom,
            'Distributor Commission': data.distcom,
            'Retailer Commission': data.retailcom,
            'Net': data.net,
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Turnover Report');
        XLSX.writeFile(wb, 'TurnoverReport.xlsx');
    };
    const renderFooter = () => (
        <tr>
            <td colSpan="2"><strong>Total</strong></td>
            <td><strong>{sums.playPoints}</strong></td>
            <td><strong>{sums.winPoints}</strong></td>
            <td><strong>{sums.endPoints}</strong></td>
            <td><strong>{sums.supercom}</strong></td>
            <td><strong>{sums.distcom}</strong></td>
            <td><strong>{sums.retailercom}</strong></td>
            <td><strong>{sums.net}</strong></td>
        </tr>
    );
    return (
        <div className="container-fluid">
            {/* Export Button */}
            <div className='flex flex-row gap-2 mb-2'>
                <button className='btn btn-secondary text-white' onClick={() => window.history.back()}>
                    <i className='fa fa-arrow-left'></i> Back
                </button>
                <button className="btn btn-primary" onClick={handleExport}>
                    <i className="fas fa-file-excel"></i> Export XLS
                </button>
            </div>

            {/* DataTable Component */}
            <div className="table-responsive">
                <DataTable
                    columns={columns}

                    data={data} // Use the correct data prop here
                    pagination={true} // Enable pagination
                    highlightOnHover={true} // Highlight rows on hover
                    responsive={true} // Make the table responsive
                    selectableRows={false} // Disable row selection
                    sortIcon={<i className="fas fa-sort"></i>} // Custom sort icon (optional)
                    customStyles={{
                        table: {
                            style: {
                                border: '1px solid #dee2e6', // Border around the entire table
                            },
                        },
                        headRow: {
                            style: {
                                borderBottom: '2px solid #dee2e6', // Border under the header row
                            },
                        },
                        headCells: {
                            style: {
                                borderRight: '1px solid #dee2e6', // Border on the header cells
                            },
                        },
                        cells: {
                            style: {
                                borderRight: '1px solid #dee2e6', // Border on the table cells
                            },
                        },
                    }}
                    // Manually render the footer row
                    footer={renderFooter()}
                />
            </div>
        </div>
    );
};

export default TurnoverReportTable;