import { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

import ExcelJS from 'exceljs';
import 'font-awesome/css/font-awesome.min.css';

const AdminDataTable = ({ admins, openModal, handleActivateDeactivate, handleDelete }) => {

  const columns = useMemo(() => [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'UserName',
      width: '150px',
      selector: row => (
        <Link to={`../admin/players/details/${row._id}`} className="text-decoration-none">
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
      selector: row => row?.refId?.username || "N/A",
      sortable: true,
    },
    {
      name: 'Unique ID',
      selector: row => row?._id || "N/A",
      sortable: true,
    },
    {
      name: 'Points',
      width: '100px',
      selector: row => row?.walletBalance ?? "N/A",
      sortable: true,
    },
    {
      name: 'Games',
      selector: row => (
        <ul className='p-2'>
          {row.games && row.games.length > 0 ? (
            row.games.map((game, index) => (
              <li key={index} className='mb-1'>{game.gameName}</li> // Assuming gameName is the property you want to display
            ))
          ) : (
            <li>No games available</li>
          )}
        </ul>
      ),
    },
    {
      name: 'Date & Time',
      selector: row => row.createdAt ? new Date(row.createdAt).toLocaleString() : "N/A",
      sortable: true,
    },
    {
      name: 'Action',
      width: '290px',
      selector: row => (
        <div className="btn-group">
          {/* Edit */}
          <Link to={`edit/${row._id}`} className="btn btn-outline-info">
            <i className="fas fa-edit"></i>
          </Link>

          {/* Credit Transfer */}
          <Link to={`credittransfer/${row._id}`} className="btn btn-outline-success">
            <i className="fas fa-arrow-up"></i>
          </Link>

          {/* Credit Adjustment */}
          <Link to={`creditadjust/${row._id}`} className="btn btn-outline-warning">
            <i className="fas fa-arrow-down"></i>
          </Link>

          {/* Activate/Deactivate */}
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


          {/* Delete */}
          <button
            className="btn btn-outline-danger"
            onClick={() =>
              openModal(
                `Are you sure you want to delete ${row.username}?`,
                'Delete Confirmation',
                () => handleDelete(row._id)
              )
            }
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      ),
    },
  ], [openModal, handleActivateDeactivate, handleDelete]);



  const handleExport = async () => {
    // Prepare the data for export
    const exportData = admins.map(admin => ({
      'UserName': admin.username || "N/A",
      'Refer ID': admin.refId?.username || "N/A",
      'Unique ID': admin._id || "N/A",
      'Points': admin.walletBalance ?? "N/A",
      'Games': admin.games?.map(game => game.gameName).join(", ") || "N/A",
      'Date & Time': admin.createdAt ? new Date(admin.createdAt).toLocaleString() : "N/A",
    }));

    // Create a new workbook and add a worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Admins');

    // Define the columns based on the exportData keys
    worksheet.columns = [
      { header: 'UserName', key: 'UserName', width: 30 },
      { header: 'Refer ID', key: 'Refer ID', width: 30 },
      { header: 'Unique ID', key: 'Unique ID', width: 30 },
      { header: 'Points', key: 'Points', width: 15 },
      { header: 'Games', key: 'Games', width: 40 },
      { header: 'Date & Time', key: 'Date & Time', width: 25 },
    ];

    // Add rows to the worksheet
    exportData.forEach(data => worksheet.addRow(data));

    // Write the file to the browser (in the client-side environment)
    worksheet.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'AdminsList.xlsx';
      link.click();
    });
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
          data={admins}
          pagination
          highlightOnHover
          responsive
          selectableRows={false}
          customStyles={{
            table: { style: { border: '1px solid #dee2e6' } },
            headRow: { style: { borderBottom: '2px solid #dee2e6' } },
            headCells: { style: { borderRight: '1px solid #dee2e6' } },
            cells: { style: { borderRight: '1px solid #dee2e6' } },
          }}
        />
      </div>
    </div>
  );
};

export default AdminDataTable;
