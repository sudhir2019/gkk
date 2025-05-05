import React from 'react';
import DataTable from 'react-data-table-component';

import 'font-awesome/css/font-awesome.min.css';

const TimeDataTable = ({ times }) => {
    // Define the columns for your DataTable
    const columns = [
        {
            name: 'No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '60px',
        },
        {
            name: 'Time ID',

            selector: row => row._id,
            sortable: true,
        }, {
            name: 'Time in sec',
            selector: row => row.timecount,
            width: '190px',
            sortable: true,
        },


    ];

    // DataTable configuration
    const tableOptions = {
        pagination: true, // Enable pagination
        highlightOnHover: true, // Highlight rows on hover
        responsive: true, // Make the table responsive
        selectableRows: false, // Disable row selection
        sortIcon: <i className="fas fa-sort"></i>, // Custom sort icon (optional)
    };


    return (
        <div className="container-fluid">
           

            {/* DataTable Component */}
            <div className="table-responsive">
                <DataTable
                    columns={columns}
                    data={times}
                    {...tableOptions} // Spread tableOptions for additional configurations
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
                />
            </div>
        </div>
    );
};

export default TimeDataTable;
