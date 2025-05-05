import React from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import 'font-awesome/css/font-awesome.min.css';

const GameDataTable = ({ games, openModal, handleActivateDeactivate, handleDelete }) => {
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
    // {
    //   name: 'Copy',
    //   width: '70px',
    //   selector: row => (
    //     <i className="fas fa-copy"></i>
    //   )
    // },
    {
      name: 'Game Name',
      selector: row => row.gameName,
      width: '190px',
      sortable: true,
    },
    {
      name: 'Digits',
      width: '100px',
      selector: row => row.nodigit,
      sortable: true,
    },

    {
      name: 'Time',
      width: '100px',
      selector: row => (
        row.timeId && row.timeId.map((time, k) => {
          return (
            <span key={k}>{time.timecount}</span>
          )
        })
      ),
      sortable: true,
    },
    {
      name: 'Status', width: '100px',

      selector: row => (
        <span
          className={`badge ${row.status === 'active'
            ? 'bg-success'
            : row.status === 'inactive'
              ? 'bg-danger'
              : row.status === 'coming-soon'
                ? 'bg-warning'
                : 'bg-secondary'
            }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Publisher',
      selector: row => row.publisher,
      sortable: true,
    },
    {
      name: 'Release Date',
      selector: row => new Date(row.releaseDate).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Action',
      width: '200px',
      selector: row => (
        <div className="btn-group">
          <Link to={`edit/${row._id}`} type="button" className="btn btn-outline-info">
            <i className="fas fa-edit"></i>
          </Link>
          {row.status === 'active' ? (
            <Link
              to="#"
              className="btn btn-outline-secondary"
              onClick={() =>
                openModal(
                  `Are you sure you want to deactivate ${row.gameName}?`,
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
                  `Are you sure you want to activate ${row.gameName}?`,
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
                `Are you sure you want to delete ${row.gameName}?`,
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
    // Extract necessary data (e.g., Game Name, Game ID, etc.)
    const exportData = games.map(game => ({
      'Game ID': game.gameId,
      'Game Name': game.gameName,
      'No. of Digits': game.nodigit,
      Status: game.status,
      Publisher: game.publisher,
      'Release Date': new Date(game.releaseDate).toLocaleDateString(),
    }));

    // Convert the data to a worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Games');

    // Export to Excel
    XLSX.writeFile(wb, 'GamesList.xlsx');
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
          data={games}
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

export default GameDataTable;
