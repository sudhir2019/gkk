import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'font-awesome/css/font-awesome.min.css';

const GameHistoryDataModel = ({ data }) => {

    // Define table columns
    const columns = [
        {
            name: 'No',
            selector: (row, index) => index + 1,
            width: '60px',
            sortable: false
        },
        {
            name: 'TicketID',
            selector: (row) => row.ticketId,
            width: '120px',
            sortable: false
        },
        {
            name: 'Username',
            selector: row => (
                <div className='d-flex align-items-center'>
                    {row.username}
                    <i className='fa fa-eye ml-2 text-primary'></i>
                </div>
            ),
            sortable: true
        },
        {
            name: 'Game ID',
            selector: row => row.gameId,
            sortable: true
        },
        {
            name: 'Time',
            selector: row => (
                <div>
                    {row.timeopen}  {row.timeclose}
                </div>
            ),
            sortable: true
        },
       
        {
            name: 'Play Points',
            selector: row => row.playpoints,
            sortable: true
        },
        {
            name: 'Win Points',
            selector: row => row.winpoints,
            sortable: true
        },
        {
            name: 'Result',
            selector: row => row.resultNo || 'Pending',
            sortable: true
        },
        {
            name: 'Claim Date',
            width:'250px',
            selector: row => moment(row.claimdate).format('YYYY-MM-DD HH:mm:ss'),
            sortable: true
        }
    ];

    const customStyles = {
        table: {
            style: {
                border: '1px solid #dee2e6',
            },
        },
        headRow: {
            style: {
                backgroundColor: '#f8f9fa',
                fontWeight: 'bold',
                borderBottom: '2px solid #dee2e6',
            },
        },
        headCells: {
            style: {
                borderRight: '1px solid #dee2e6',
            },
        },
        rows: {
            style: {
                minHeight: '50px',
            },
        },
        cells: {
            style: {
                borderRight: '1px solid #dee2e6',
            },
        },
    };

    return (
        <div className="container-fluid">
            <div className="table-responsive">
                <DataTable
                    title="Game History"
                    columns={columns}
                    data={data}
                    pagination
                    highlightOnHover
                    responsive
                    customStyles={customStyles}
                    sortIcon={<i className="fa fa-sort" />}
                    noDataComponent="No history found for this game."
                />
            </div>
        </div>
    );
};

export default GameHistoryDataModel;
