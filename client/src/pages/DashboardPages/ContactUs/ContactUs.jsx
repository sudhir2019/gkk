import { ScaleLoader } from "react-spinners";
import useFetchComplaints from "../../../hooks/admin/Complaints/useFetchComplaints";
import useChangeComplaintStatus from "../../../hooks/admin/Complaints/useChangeComplaintStatus";

function ContactUs() {
    const {
        complaints,
        isComplaintLoading: loading,
        isComplaintError,
        complaintErrorMessage: error,
    } = useFetchComplaints();

    const { handleStatusChange } = useChangeComplaintStatus();

    return (
        <div className="row relative">
            <div className="col-12 mb-4">
                <div className="card">
                    <div className="card-header d-flex flex-wrap justify-content-between align-items-center">
                        <h4 className="font-semibold mb-2 mb-md-0">Contact Us Messages</h4>
                    </div>

                    <div className="card-body table-responsive">
                        {isComplaintError && (
                            <div className="alert alert-danger">{error}</div>
                        )}

                        <div className="table-responsive">
                            <table className="table table-bordered table-hover table-striped text-center align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Enquiry Type</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Complaint Details</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {complaints.length > 0 ? (
                                        complaints.map((c, idx) => (
                                            <tr key={c._id}>
                                                <td>{idx + 1}</td>
                                                <td>{c.enquiryType}</td>
                                                <td>{c.fullName}</td>
                                                <td className="text-break">{c.email}</td>
                                                <td>{c.mobile}</td>
                                                <td
                                                    className="text-break"
                                                    style={{
                                                        maxWidth: "200px",
                                                        whiteSpace: "pre-wrap",
                                                        overflowX: "auto",
                                                        overflowY: "auto",
                                                        maxHeight: "100px",
                                                        display: "block"
                                                    }}
                                                >
                                                    {c.complaintDetails}
                                                </td>
                                                <td style={{ minWidth: "120px" }}>
                                                    <select
                                                        className={`form-select form-select-sm text-white fw-semibold 
                                                            ${c.status === 'Pending'
                                                                ? 'bg-warning'
                                                                : c.status === 'Completed'
                                                                    ? 'bg-success'
                                                                    : 'bg-danger'
                                                            }`}
                                                        value={c.status}
                                                        onChange={(e) => handleStatusChange(c._id, e.target.value)}
                                                        style={{
                                                            minWidth: "100px",
                                                            maxWidth: "100%",
                                                            fontSize: "0.875rem",
                                                            padding: "0.25rem 0.5rem"
                                                        }}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Completed">Completed</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </td>

                                                <td>{new Date(c.createdAt).toLocaleString()}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center">
                                                No messages found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <ScaleLoader />
                </div>
            )}
        </div>
    );
}

export default ContactUs;
