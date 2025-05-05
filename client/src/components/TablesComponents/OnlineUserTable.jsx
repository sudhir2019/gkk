import React from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

const OnlineUserTable = ({ users }) => {
    // Define the columns for the DataTable
    const columns = [
        {
            name: 'No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '60px',
        },
        {
            name: 'User Name',
            width: '125px',
            selector: row => (
                <div className="w-100 d-flex flex-row justify-content-between align-items-center">
                    <Link to="#" className="text-decoration-none">{row.username}</Link>

                </div>
            ),
            sortable: true,
        },
       
        {
            name: 'Points',
            selector: row => parseFloat(row.points).toFixed(2),
            sortable: true,
        },
        {
            name: 'Play',
            selector: row => parseFloat(row.playPoints).toFixed(2),
            sortable: true,
        },
        {
            name: 'Win',
            selector: row => parseFloat(row.winPoints).toFixed(2),
            sortable: true,
        },
        {
            name: 'Claim',
            selector: row => parseFloat(row.claimPoints).toFixed(2),
            sortable: true,
        },
        {
            name: 'End',
            selector: row => parseFloat(row.endPoints).toFixed(2),
            sortable: true,
        },
        {
            name: 'Is Online',
            width:'100px',
            selector: row => (
                <span className={row.isOnline ? 'badge badge-success' : 'badge badge-danger'}>
                    {row.isOnline ? 'Online' : 'Offline'}
                </span>
            ),
            sortable: true,
        },
        {
            name: 'Last Login',
            selector: row => row.lastLogin,
            width:'190px',
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
                    data={users} // Use the correct data prop here (ensure all necessary data like `isOnline`, `playPoints`, etc. are included)
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

export default OnlineUserTable;
