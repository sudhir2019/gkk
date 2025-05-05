import React, { useState } from 'react';
import Header from "../components/LayoutComponets/Header";



const slider1 = "./src/assets/images/Slider1.gif";

const slider2 = "./src/assets/images/Slider2.gif";
const PointTransfer = () => {
    const [formData, setFormData] = useState({
        receiver_id: '',
        pin: '',
        point: ''
    });

    const [toggleOption, setToggleOption] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleToggleButton =()=>{
        setToggleOption(!toggleOption);
      //  console.log(toggleOption);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., API call)
        console.log('Form Data Submitted:', formData);
        // You can add your API call or further logic here
    };

    return (
        <div className="main-wrapper">
            <Header />


            <div className="container" style={{ width: "82%", display: "flex", flexDirection: "row", justifyContent: "center", gap: 5 }}>
                <div className="side-gallery">
                    <img src={slider1} alt="Slider 1" height="422px" />
                </div>

                <div className="tbl-containerr" style={{ width: "" }}>
                    <form id="transferForm" onSubmit={handleSubmit}>

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
                                                <input type="submit" name="btnRefresh" value="Refresh" id="siteDataHolder_btnRefresh" />
                                            </span>
                                        </div>
                                    </td>
                                    <td className="subheadings">
                                        <div>
                                            <span>Transferable</span>
                                            <span>
                                                <input
                                                    type="submit"
                                                    name="btnPointTransfer"
                                                    value="Point Transfer"
                                                    id="siteDataHolder_btnPointTransfer"
                                                    onClick={handleToggleButton}
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
                                            <div>
                                                <table cellSpacing="0" rules="all" border="1" id="siteDataHolder_grdViewTransferedPoints" style={{ borderCollapse: 'collapse' }}>
                                                    <tbody></tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="data">
                                        <div className="ScrollDiv">
                                            <div>
                                                <table cellSpacing="0" rules="all" border="1" id="siteDataHolder_grdViewTransferedPoints" style={{ borderCollapse: 'collapse' }}>
                                                    <tbody></tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="footer">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <input id="siteDataHolder_chkBoxSelectAllReceive" type="checkbox" name="chkBoxSelectAllReceive" disabled />
                                                        <label htmlFor="siteDataHolder_chkBoxSelectAllReceive">Select All</label>
                                                    </td>
                                                    <td>
                                                        <input type="submit" name="action" value="Receive" id="siteDataHolder_btnReceive" />
                                                    </td>
                                                    <td>
                                                        <input type="submit" name="action" value="Reject" id="siteDataHolder_btnReject" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td className="footer">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <input id="siteDataHolder_chkBoxSelectAllTransfer" type="checkbox" name="chkBoxSelectAllTransfer" disabled />
                                                        <label htmlFor="siteDataHolder_chkBoxSelectAllTransfer">Select All</label>
                                                    </td>
                                                    <td>
                                                        <input type="submit" name="action" value="Cancel" id="siteDataHolder_btnCancel" />
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
                                        <form action="#" method="post" id="transferForm">
                                            <table className="p-child">
                                                <tbody>
                                                    <tr>
                                                        <td>To Account No. :</td>
                                                        <td>
                                                            <input
                                                                name="receiver_id"
                                                                type="text"
                                                                defaultValue="GK"
                                                                maxLength="10"
                                                                id="siteDataHolder_txtTransferID"
                                                            />
                                                        </td>
                                                        <td>
                                                            <span id="siteDataHolder_reqTransferID" style={{ color: "red", display: "none" }}>
                                                                * Please Provide Member ID
                                                            </span>
                                                            <span id="siteDataHolder_regTransferID" style={{ color: "red", display: "none" }}>
                                                                * Member ID not Proper
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Your Pin :</td>
                                                        <td>
                                                            <input name="pin" type="password" maxLength="16" id="siteDataHolder_txtMemberPin" />
                                                        </td>
                                                        <td>
                                                            <span id="siteDataHolder_reqMemberPin" style={{ color: "red", display: "none" }}>
                                                                * Please Provide Your Account Pin
                                                            </span>
                                                            <span id="siteDataHolder_regMemberPin" style={{ color: "red", display: "none" }}>
                                                                * Numeric Value Allowed Only
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Amount :</td>
                                                        <td>
                                                            <input name="point" type="text" maxLength="7" id="siteDataHolder_txtTransferAmount" />
                                                        </td>
                                                        <td>
                                                            <span id="siteDataHolder_reqTransferAmount" style={{ color: "red", display: "none" }}>
                                                                * Please Provide Amount To Transfer
                                                            </span>
                                                            <span id="siteDataHolder_rngValidateAmount" style={{ color: "red", display: "none" }}>
                                                                * You can transfer Points between 1 to 1000000
                                                            </span>
                                                            <span id="siteDataHolder_cmpValidateAmount" style={{ color: "red", display: "none" }}>
                                                                * Balance is not Enough
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="2"></td>
                                                        <td>
                                                            <span id="siteDataHolder_cusValidateNarration" style={{ color: "red", display: "none" }}>
                                                                * Maximum Limit is 50 Characters only.
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type="submit" name="ctl00$siteDataHolder$btnTransfer" value="Transfer" id="siteDataHolder_btnTransfer" />
                                                        </td>
                                                        <td align="right">
                                                            <button type="button" onClick={handleToggleButton}>Close</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </form>
                                    </td>
                                </tr>
                            </tbody>
                        </table>





                    </form>
                </div>

                <div className="side-gallery">
                    <img src={slider2} alt="Slider 2" height="422px" />
                </div>
            </div>
        </div>
    );
};

export default PointTransfer;