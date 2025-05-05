import React from 'react';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import 'font-awesome/css/font-awesome.min.css';

const TransactionDataTable = ({ data }) => {

    // Define the columns for your DataTable
    const columns = [
        {
            name: 'No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '60px',
        },
        {
            name: 'Transaction ID',
            selector: row => row._id,
            sortable: true,
            width: "100px"
        },
        {
            name: 'User',
            selector: row => row.userId?.username, // Assuming `userId` is an array and you want the first user's name
            sortable: true,
              width: "150px"
        },
        {
            name: 'Recipient',
            selector: row => row.toUserId?.username, // Assuming `toUserId` is an array and you want the first recipient's name
            sortable: true,
            width: "150px"
        },
        {
            name: 'Credit',
            selector: row => row.amount > 0 ? row.amount : 0,
            sortable: true,
        },
        {
            name: 'Debit',
            selector: row => row.amount < 0 ? row.amount : 0,
            sortable: true,
        },

        {
            name: 'Transaction Message',
            selector: row => row.transactionMessage,
            sortable: true,
            width: "350px",
            style: {
                wordWrap: 'break-word',    // Ensures word wrapping
                whiteSpace: 'normal',      // Allow wrapping of text
                overflowWrap: 'break-word', // Ensures that long words break into the next line if needed
            }
        },
        {
            name: 'Status',
            selector: row => (
                <span
                    className={`badge ${row.status === 'completed' ? 'bg-success' : 'bg-danger'}`}
                >
                    {row.status}
                </span>
            ),
            sortable: true,
        },
        {
            name: 'Created Date',
            selector: row => new Date(row.createdAt).toLocaleDateString(),
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
        const exportData = data.map(transaction => ({
            'Transaction ID': transaction._id,
            User: transaction.userId[0]?.username,
            Recipient: transaction.toUserId[0]?.username,
            Credit: transaction.transactionType === 'transfer' ? transaction.amount : 0,
            Debit: transaction.transactionType === 'generated' ? transaction.amount : 0,
            'New Balance': transaction.newBalance, // Adjust field if necessary
            'Transaction Message': transaction.transactionMessage,
            Status: transaction.status,
            'Created Date': new Date(transaction.createdAt).toLocaleDateString(),
        }));

        // Convert the data to a worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);

        // Create a new workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Transactions');

        // Export to Excel
        XLSX.writeFile(wb, 'TransactionsList.xlsx');
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

export default TransactionDataTable;