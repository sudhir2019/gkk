import React from 'react';
import './PopupModal.css';
import closebox from '../../assets/images/closebox.png';
const PopupModal = ({ modelData, isOpen, onClose }) => {
    if (!isOpen) return null;
    for (const key in modelData) {
        // if (Object.prototype.hasOwnProperty.call(modelData, key)) {
        //     const element = modelData[key];
        // }
        console.log(modelData[key]);
    }

    return (
        <div className="popup-overlay">
            <span className="popup-background">
                <img src={closebox} onClick={onClose} className='close' alt="Close" />
                <p className="paraWeekDate" id="paraWeekDate">Week Details :03-MAR-2025 to 09-MAR-2025</p>
            </span>
            <div className="popup-modal">
                <div className="table_formatting">


                    <h3 style={{ color: 'black', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>From MONDAY, MARCH, 31, 2025 to SUNDAY, APRIL, 06, 2025</h3>
                    <div>Your Members Played in Other Agents CyberCafe</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Member Id</th>
                                <th>Member Name</th>
                                <th>Play</th>
                                <th>Reg</th>
                                <th>Points Used By The Member</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>GK00241724</td><td>MP Gift ID</td><td>2000 ANDROID Game</td><td>13212</td><td>2000</td></tr>
                            <tr><td>GK00241726</td><td>MP Gift ID</td><td>2000 ANDROID Game</td><td>13212</td><td>42000</td></tr>
                            <tr><td>GK00241730</td><td>MP Gift ID</td><td>2000 ANDROID Game</td><td>13212</td><td>1200</td></tr>
                            <tr><td>GK00534885</td><td>GIFT ID</td><td>2000 ANDROID Game</td><td>13212</td><td>60670</td></tr>
                        </tbody>
                        <tfoot>
                            <tr><td colSpan="5">Total Point Used : 105870</td></tr>
                        </tfoot>
                    </table>

                    <div>Total Points Used</div>
                    <table>
                        <thead>
                            <tr><th>Type</th><th>Total Points</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Your Members Played in Other Agents CyberCafe</td><td>105870</td></tr>
                        </tbody>
                        <tfoot>
                            <tr><td colSpan="2">Total Point Used : 105870</td></tr>
                        </tfoot>
                    </table>

                    <div className="DetailsDiv">
                        <p>In this week your revenue is at <span style={{ color: '#CC3300' }}>50%</span></p>
                        <p>Due to earning in this week, the company would able to provide you <span style={{ color: '#CC3300' }}>52935</span> points as a gift</p>
                        <p>0% of your points are being deducted with respect to your loan towards the company.</p>
                        <p>Previous Loan : 0</p>
                        <p>Actual Points : 52935</p>
                        <p>Deducted Points : 0</p>
                        <p>Loan Remaining : No Record Found</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupModal;
