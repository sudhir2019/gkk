import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import 'font-awesome/css/font-awesome.min.css';

const DetailsDataTable = ({ superdistributers, openModal, handleActivateDeactivate, handleDelete, userLInk, adminId, editlink, transferlink, adjustlink }) => {
  // Define the columns for the DataTable;
  const getColumns = (userRole) => [
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
        <div className='w-100 d-flex flex-row justify-content-between align-items-center'>
          <Link to={`${userLInk}${row._id}`} className="text-decoration-none">{row.username}</Link>
          <span>&nbsp;</span>
          <i className='fa fa-eye text-lg text-blue-600'></i>
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Refer ID',
      selector: row => row.refId.username,
      sortable: true,
    },
    {
      name: 'Unique ID',
      selector: row => row.username,
      sortable: true,
    },
    {
      name: 'Points',
      selector: row => row.walletBalance,
    },
    ...(userRole === 'player'
      ? [
        {
          name: 'Is Online',
          selector: row =>
            row.isLoggedIn ? (
              <span className="badge text-white bg-success">Online</span>
            ) : (
              <span className="badge text-white bg-danger">Offline</span>
            ),
          sortable: true,
        },
      ]
      : []),
    {
      name: 'Date & Time',
      width: '200px',
      selector: row => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
    {
      name: 'Action',
      width: '290px',
      selector: row => (
        <div className="btn-group">
          <Link to={`${editlink}/${row._id}`} className="btn btn-outline-info">
            <i className="fas fa-edit"></i>
          </Link>
          <Link to={`${transferlink}/${row._id}`} className="btn btn-outline-success">
            <i className="fas fa-arrow-up"></i>
          </Link>
          <Link to={`${adjustlink}/${row._id}`} className="btn btn-outline-warning">
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
                  () => handleActivateDeactivate(row._id, adminId, true)
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
                  () => handleActivateDeactivate(row._id, adminId, false)
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
                () => handleDelete(row._id, adminId)
              )
            }
          >
            <i className="fas fa-trash"></i>
          </Link>
        </div>
      ),
    },
  ];
  const role = superdistributers[0]?.role || null;
  const columns = getColumns(role);
  // DataTable configuration
  const tableOptions = {
    pagination: true, // Enable pagination
    highlightOnHover: true, // Highlight rows on hover
    responsive: true, // Make the table responsive
    selectableRows: false, // Disable row selection
    sortIcon: <i className="fas fa-sort"></i>, // Custom sort icon (optional)
  };
  const handleExport = () => {
    const exportData = superdistributers.map(superDistributer => {
      const data = {
        'UserName': superDistributer.username,
        'Refer ID': superDistributer.refId,
        'Unique Id': superDistributer.username,
        'Points': (superDistributer.wallet || [])
          .map(point => point.individualCredit)
          .join(", "),
        'Date & Time': new Date(superDistributer.createdAt).toLocaleString(),
      };

      // Conditionally add "Is Online" if role is "users"
      if (superDistributer.role === "player") {
        data["Is Online"] = superDistributer.isLoggedIn ? 'Online' : 'Offline';
      }

      return data;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Super Area Manager');
    XLSX.writeFile(wb, 'SuperDistributorsList.xlsx');
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
          data={superdistributers} // Use the correct data prop here
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


export default DetailsDataTable;
