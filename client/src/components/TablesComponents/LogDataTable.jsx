import { useState } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";

const LogDataTable = ({ logs }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    // Filter logs based on date and search query
    const filteredLogs = logs.filter((log) => {
        const matchesDate = selectedDate ? log.createdAt.includes(selectedDate) : true;
        const matchesSearch =
            log.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.username.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesDate && matchesSearch;
    });

    // Define columns for DataTable
    const columns = [
        {
            name: "No",
            selector: (row, index) => index + 1,
            sortable: true,
            width: "70px",
        },
        {
            name: "Username",
            selector: (row) => row.username || "N/A",
            sortable: true,
            width: "120px",
        },
        {
            name: "Subject",
            selector: (row) => row.subject || "N/A",
            sortable: true,
            width: "320px",
        },
        {
            name: "URL",
            selector: (row) => row.requestUrl || "N/A",
            sortable: false,
        },
        // {
        //     name: "URL",
        //     selector: (row) => row.requestUrl || "N/A",
        //     cell: (row) => (
        //         <a href={row.requestUrl} target="_blank" rel="noopener noreferrer">
        //             {row.requestUrl}
        //         </a>
        //     ),
        //     sortable: false,
        //     wrap: true,
        // },
        {
            name: "Method",
            selector: (row) => row.method || "N/A",
            sortable: true,
            width: "100px",
        },
        {
            name: "IP Address",
            selector: (row) => row.ipAddress || "N/A",
            sortable: true,
            width: "130px",
        },
        {
            name: "Created At",
            selector: (row) =>
                row.createdAt
                    ? new Date(row.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true
                    })
                    : "N/A",
            sortable: true,
        },
    ];

    // CSV Export Configuration
    const csvHeaders = [
        { label: "No", key: "index" },
        { label: "Username", key: "username" },
        { label: "Subject", key: "subject" },
        { label: "URL", key: "requestUrl" },
        { label: "Method", key: "method" },
        { label: "IP Address", key: "ipAddress" },
        { label: "Created At", key: "createdAt" },
    ];

    const csvData = filteredLogs.map((log, index) => ({
        index: index + 1,
        username: log.username || "N/A",
        subject: log.subject || "N/A",
        requestUrl: log.requestUrl || "N/A",
        method: log.method || "N/A",
        ipAddress: log.ipAddress === "::1" ? "127.0.0.1" : log.ipAddress || "N/A",
        createdAt: log.createdAt
            ? new Date(log.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            })
            : "N/A",
    }));


    return (
        <div className="card">
            <div className="card-body">
                <h6 className="card-title">Log Activities</h6>

                {/* Filters: Date Picker & Search Box */}
                <div className="form-group d-flex">
                    <div className="mr-2">
                        <label><strong>Select Date:</strong></label>
                        <input
                            type="date"
                            className="form-control"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>
                    <div className="ml-2">
                        <label><strong>Search:</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by username or subject"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {/* CSV Export Button */}

                </div>
                <div className="mt-3">
                    <CSVLink data={csvData} headers={csvHeaders} filename="logs.csv">
                        <button className="btn btn-primary">Export CSV</button>
                    </CSVLink>
                </div>
                {/* DataTable */}
                <DataTable
                    columns={columns}
                    data={filteredLogs}
                    pagination
                    highlightOnHover
                    responsive
                    striped
                    noHeader
                />
                {/* Entry Count */}
                <div className="dataTables_info mt-2">
                    Showing {filteredLogs.length} of {logs.length} entries
                </div>
            </div>
        </div>
    );
};

export default LogDataTable;
