import React, { useEffect, useState } from 'react';
import useDashboard from '../hook/useDashboard';
import { useDispatch } from 'react-redux';
import { loadBalance, pointTransfer, submitCancel, submitReceive, submitReject } from '../stores/actions/appActions';
import { setSuccessMessage } from '../stores/slices/appSlice';
import slider1 from "../assets/images/Slider1.gif";
import slider2 from "../assets/images/Slider2.gif";
const Dashboard = () => {
    const dispatch = useDispatch();
    const [toggleOption, setToggleOption] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const { authUser, userData, receiveData, transferData, refreshButton } = useDashboard();

    const [transfer, setTransfer] = useState(transferData || []);
    const [selectedTransfers, setSelectedTransfers] = useState([]);

    const [receive, setReceive] = useState([]);
    const [selectedReceivers, setSelectedReceivers] = useState([]);

    // Update state when transferData changes
    useEffect(() => {
        setTransfer(transferData);
    }, [transferData]);

    // Update state when receiveData changes
    useEffect(() => {
        if (receiveData) {
            setReceive(receiveData);
        }
    }, [receiveData]);

    const transferHandleCheckboxChange = (id) => {
        setSelectedTransfers((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const receiveHandleCheckboxChange = (id) => {
        setSelectedReceivers((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedTransfers(transfer.map((item) => item._id));
        } else {
            setSelectedTransfers([]);
        }
    };

    const handleSelectAllReceive = (event) => {
        if (event.target.checked) {
            setSelectedReceivers(receive.map((item) => item._id));
        } else {
            setSelectedReceivers([]);
        }
    };

    const handleCancel = async () => {
        try {
            if (!userData) {
                console.error("Error: userData is undefined.");
                return;
            }

            if (!selectedTransfers || selectedTransfers.length === 0) {
                console.warn("No transfer selected.");
                return;
            }

            await dispatch(submitCancel({ userData, transferData: selectedTransfers })).unwrap();
            await dispatch(loadBalance()).unwrap();


            setSuccessMessage("Cancel data successfully.");
        } catch (error) {
            setSuccessMessage("Cancel data successfully.");
            console.error("Error submitting transfer:", error);

        }
    };

    const handleReceive = async () => {
        try {
            if (!userData) {
                console.error("Error: userData is undefined.");
                return;
            }

            if (!selectedReceivers || selectedReceivers.length === 0) {
                console.warn("No receivers selected.");
                return;
            }

            //  console.log("Submitting receive data:", { userData, receiveData: selectedReceivers });

            await dispatch(submitReceive({ userData, receiveData: selectedReceivers })).unwrap();
            await dispatch(loadBalance()).unwrap();

            setSuccessMessage("Receive data submitted successfully.");

        } catch (error) {
            setSuccessMessage("Receive data submitted successfully.");
            console.error("Error submitting receive data:", error);
        }
    };

    const handleReject = async () => {
        try {
            if (!userData) {
                console.error("Error: userData is undefined.");
                return;
            }

            if (!selectedReceivers || selectedReceivers.length === 0) {
                console.warn("No receivers selected.");
                return;
            }

            console.log("Submitting submitReject data:", { userData, receiveData: selectedReceivers });

            await dispatch(submitReject({ userData, receiveData: selectedReceivers })).unwrap();
            await dispatch(loadBalance()).unwrap();

            setSuccessMessage("Reject data submitted successfully.");
        } catch (error) {
            setSuccessMessage("Reject data submitted successfully.");

            console.error("Error submitting receive data:", error);
        }
    };

    const [formData, setFormData] = useState({
        receiver_id: "GK",
        pin: "",
        password: "",
        amount: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the page from reloading
        if (loading) return; // Prevent duplicate API calls
        setLoading(true);
        setError(null);


        try {
            const resultAction = await dispatch(
                pointTransfer({
                    receiver_id: formData.receiver_id,
                    amount: formData.amount,
                    pin: formData.pin,
                    password: formData.password, // Replace with actual password if needed
                })
            ).unwrap();
            setSuccessMessage("Point Transfer successfully!"); // ✅ Set success message in Redux state
            //  console.log("Point Transfer successfully!");
            setFormData({ receiver_id: "GK", pin: "", amount: "" }); // Reset form fields

        } catch (err) {
            // console.error("Error in point transfer:", err);
            if (err.success === true) {
                setSuccessMessage("Point Transfer successfully!"); // ✅ Set success message in Redux state
            }
            setFormData({ receiver_id: "GK", pin: "", amount: "" }); // Reset form fields
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (successMessage) {
            setTimeout(() => {
                setSuccessMessage("");
                location.reload();
            }, 3000);
        }
    }, [successMessage, dispatch]);

    return (
        <>
            <center>
                {error && <p style={{ color: "red" }}>{typeof error === "string" ? error : error.error || ""}</p>}
            </center>
            <center>
                {successMessage && <p style={{ color: "green" }}>{successMessage || "Point Transfer Successfully"}</p>}
            </center>
            <div className="container" style={{ width: "82%", display: "flex", flexDirection: "row", justifyContent: "center", gap: 5 }}>
                <div className="side-gallery">
                    <img src={slider1} alt="Slider 1" height="422px" />
                </div>
                <div className="tbl-containerr" style={{ width: "" }}>
                    <table style={{ width: "600px" }}>
                        <tbody>
                            <tr>
                                <th colSpan="2" className="headings" align="left">
                                    :: Manage My Points
                                    <table id="siteDataHolder_rbPointsType" className="button-point" style={{ borderStyle: 'None', fontWeight: 'bold' }}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input id="siteDataHolder_rbPointsType_0" type="radio" name="pointsType" value="GK" defaultChecked />
                                                    <label htmlFor="siteDataHolder_rbPointsType_0" style={{ color: 'white' }}> GK Points</label>
                                                </td>
                                                <td>
                                                    <input id="siteDataHolder_rbPointsType_1" type="radio" name="pointsType" value="PK" />
                                                    <label htmlFor="siteDataHolder_rbPointsType_1" style={{ color: 'white' }}> Multiplayer Points</label>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </th>
                            </tr>
                            <tr>
                                <td className="subheadings">
                                    <div>
                                        <span>Receivables</span>
                                        <span>
                                            <input type="submit" name="btnRefresh" value="Refresh" id="siteDataHolder_btnRefresh" onClick={() => refreshButton()} />
                                        </span>
                                    </div>
                                </td>
                                <td className="subheadings">
                                    <div>
                                        <span>Transferable</span>
                                        <span>
                                            <input
                                                type="button"
                                                name="btnPointTransfer"
                                                value="Point Transfer"
                                                id="siteDataHolder_btnPointTransfer"
                                                onClick={() => setToggleOption(!toggleOption)}
                                            />


                                        </span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="title-details">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>Select</td>
                                                <td style={{ width: '40%' }}>From Member ID</td>
                                                <td style={{ width: '35%' }}>Amount</td>
                                                <td style={{ width: '10%' }}>Type</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td className="title-details">
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%' }}>Select</td>
                                                <td style={{ width: '40%' }}>From Member ID</td>
                                                <td style={{ width: '35%' }}>Amount</td>
                                                <td style={{ width: '10%' }}>Type</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td className="data">
                                    <div className="ScrollDiv">
                                        <div style={{ width: '100%' }}>
                                            <table cellSpacing="0" rules="all" border="1" id="siteDataHolder_grdViewTransferedPoints" style={{ borderCollapse: 'collapse', width: '100%' }}>

                                                <tbody style={{ width: '100%' }}>
                                                    {receive && receive.map((obj, i) => (
                                                        <tr key={i}>
                                                            <td>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedReceivers.includes(obj._id)}
                                                                    onChange={() => receiveHandleCheckboxChange(obj._id)}

                                                                />
                                                            </td>
                                                            <td>{obj.userId.username}</td>
                                                            <td>{obj.amount}</td>
                                                            <td>P</td>
                                                        </tr>
                                                    ))}
                                                </tbody>

                                            </table>
                                        </div>
                                    </div>
                                </td>
                                <td className="data">
                                    <div className="ScrollDiv">
                                        <div style={{ width: "100%" }}>
                                            <table cellSpacing="0" rules="all" border="1" id="siteDataHolder_grdViewTransferedPoints" style={{ borderCollapse: 'collapse', width: "100%" }}>
                                                <tbody style={{ width: "100%" }}>
                                                    {transfer && transfer.map((obj, i) => (
                                                        <tr key={i}>
                                                            <td>
                                                                <input
                                                                    type="checkbox"

                                                                    checked={selectedTransfers.includes(obj._id)}
                                                                    onChange={() => transferHandleCheckboxChange(obj._id)}
                                                                />
                                                            </td>
                                                            <td>{obj.toUserId.username}</td>
                                                            <td>{obj.amount}</td>
                                                            <td>P</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="footer">
                                    <table style={{ width: "100%" }}>
                                        <tbody style={{ width: "100%" }}>
                                            <tr >
                                                <td>
                                                    <input id="siteDataHolder_chkBoxSelectAllReceive" type="checkbox" name="chkBoxSelectAllReceive" onClick={(e) => handleSelectAllReceive(e)} />
                                                    <label htmlFor="siteDataHolder_chkBoxSelectAllReceive">Select All</label>
                                                </td>
                                                <td>
                                                    <input type="submit" name="action" value="Receive" id="siteDataHolder_btnReceive" onClick={handleReceive} />
                                                </td>
                                                <td align='right'>
                                                    <input type="submit" name="action" value="Reject" id="siteDataHolder_btnReject" onClick={handleReject} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td className="footer">
                                    <table style={{ width: "100%" }}>
                                        <tbody style={{ width: "100%" }}>
                                            <tr style={{ width: "100%" }}>
                                                <td>
                                                    <input id="siteDataHolder_chkBoxSelectAllTransfer" type="checkbox" name="chkBoxSelectAllTransfer" onChange={handleSelectAll}
                                                        checked={selectedTransfers.length === transfer.length} />
                                                    <label htmlFor="siteDataHolder_chkBoxSelectAllTransfer" >Select All</label>
                                                </td>
                                                <td align='right'>
                                                    <input type="submit" name="action" value="Cancel" id="siteDataHolder_btnCancel" onClick={handleCancel} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="p-trans" style={{ width: "100%", display: toggleOption ? "" : "none" }}>
                        <tbody>
                            <tr>
                                <th className="headings" align="left">:: Point Transfer</th>
                            </tr>
                            <tr>
                                <td>

                                    <form onSubmit={handleSubmit} method='POST'>
                                        <table className="p-child">
                                            <tbody>
                                                <tr>
                                                    <td>To Account No. :</td>
                                                    <td>
                                                        <input
                                                            name="receiver_id"
                                                            type="text"
                                                            value={formData.receiver_id}
                                                            onChange={handleChange}
                                                            maxLength="12"
                                                            id="siteDataHolder_txtTransferID"
                                                            autoComplete='off'
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Your Pin :</td>
                                                    <td>
                                                        <input
                                                            name="pin"
                                                            type="password"
                                                            value={formData.pin}
                                                            onChange={handleChange}
                                                            maxLength="16"
                                                            id="siteDataHolder_txtMemberPin"
                                                            autoComplete='off'
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Amount :</td>
                                                    <td>
                                                        <input
                                                            name="amount"
                                                            type="text"
                                                            value={formData.amount}
                                                            onChange={handleChange}
                                                            maxLength="7"
                                                            id="siteDataHolder_txtTransferAmount"
                                                            autoComplete='off'
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <button type="submit" name="action" id="siteDataHolder_btnReceive" disabled={loading} value="Receive" style={{ background: "#1e90ff", color: "#fff", border: "none", padding: "4px", fontSize: "14px" }}>
                                                            {loading ? "Processing..." : "Transfer"}
                                                        </button>
                                                    </td>
                                                    <td align="right">
                                                        <button type="button" onClick={() => setToggleOption(false)} style={{ background: "#1e90ff", color: "#fff", border: "none", padding: "4px", fontSize: "14px" }}>
                                                            Close
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </form>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="side-gallery">
                    <img src={slider2} alt="Slider 2" height="422px" />
                </div>
            </div>
        </>
    );
};

export default Dashboard;