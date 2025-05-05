import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import 'font-awesome/css/font-awesome.min.css';

const UserDataTable = ({ users,  openModal, handleActivateDeactivate, handleDelete }) => {
    // Define the columns for the DataTable
    const columns = [
        {
            name: 'No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '60px',
        },
        {
            name: 'UserName',
            width: '150px',
            selector: row => (
                <Link to={`../player/players/details/${row._id}`} className="text-decoration-none">
                    <div className='w-100 d-flex flex-row justify-content-between align-items-center'>
                        {row.username}
                        <span>&nbsp;</span>
                        <i className='fa fa-eye text-lg text-blue-600'></i>

                    </div>
                </Link>
            ),
            sortable: true,
        },
        {
            name: 'Refer ID',
            width: '140px',
            selector: row => row.refId?.username,
            sortable: true,
        },
        {
            name: 'Unique Id',
            width: '140px',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'Points',
            width: '100px',
            selector: row => row.walletBalance
        },
        {
            name: 'Is Online',
            selector: row => (
                row.isLoggedIn ? (
                    <span className="badge text-white bg-success">Online</span>
                ) : (
                    <span className="badge text-white bg-danger">Offline</span>
                )
            ),
            sortable: true,
        },
        {
            name: 'Last Login',
            width: '200px',
            selector: row => new Date(row.createdAt).toLocaleString(),
            sortable: true,
        },
        {
            name: 'Action',
            width: '300px',
            selector: row => (
                <div className="btn-group">
                    <Link to={`edit/${row._id}`} className="btn btn-outline-info">
                        <i className="fas fa-edit"></i>
                    </Link>

                    <Link to={`credittransfer/${row._id}`} className="btn btn-outline-success">
                        <i className="fas fa-arrow-up"></i>
                    </Link>

                    <Link to={`creditadjust/${row._id}`} className="btn btn-outline-warning">
                        <i className="fas fa-arrow-down"></i>
                    </Link>

                    {row.userStatus ? (
                        <Link
                            to="#"
                            className="btn btn-outline-secondary"
                            onClick={() =>
                                openModal(
                                    `Are you sure you want to deactivate ${row.username}?`,
                                    'Deactivate Confirmation',
                                    () => handleActivateDeactivate(row._id, true)
                                )
                            }
                        >
                            <i className="fa fa-toggle-off"></i>
                        </Link>
                    ) : (
                        <Link
                            to="#"
                            className="btn btn-outline-primary"
                            onClick={() =>
                                openModal(
                                    `Are you sure you want to activate ${row.username}?`,
                                    'Activate Confirmation',
                                    () => handleActivateDeactivate(row._id, false)
                                )
                            }
                        >
                            <i className="fas fa-toggle-on"></i>
                        </Link>
                    )}

                    <Link
                        to="#"
                        className="btn btn-outline-danger delete-confirm"
                        onClick={() =>
                            openModal(
                                `Are you sure you want to delete ${row.username}?`,
                                'Delete Confirmation',
                                () => handleDelete(row._id)
                            )
                        }
                    >
                        <i className="fas fa-trash"></i>
                    </Link>
                </div>
            ),

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

    // Handle the export functionality
    const handleExport = () => {
        const exportData = users.map(user => ({
            'UserName': user.username,
            'Refer ID': user.refId,
            'Unique Id': user.username,
            'Points': user.wallet.map(point => point.individualCredit).join(", "),
            'Is Online': user.isLoggedIn ? 'Online' : 'Offline',
            'Last Login': new Date(user.createdAt).toLocaleString(),
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'player');
        XLSX.writeFile(wb, 'playersList.xlsx');
    };

    return (
        <div className="container-fluid">
            {/* Export Button */}
            <button className="btn btn-primary mb-3" onClick={handleExport}>
                <i className="fas fa-file-excel"></i> Export to Excel
            </button>

            {/* DataTable Component */}
            <div className="table-responsive">
                <DataTable
                    columns={columns}
                    data={users} // Use the correct data prop here
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

export default UserDataTable;
