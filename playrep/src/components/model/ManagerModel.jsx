import React from 'react';
import './PopupModal.css';
import closebox from '../../assets/images/closebox.png';
const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};
const ManagerModel = ({ modelData, isOpen, onClose }) => {
    if (!isOpen) return null;

    const data = modelData?.data;
    const totals = modelData?.totals;



    // console.log(modelData);

    // for (const key in modelData) {
    //     // if (Object.prototype.hasOwnProperty.call(modelData, key)) {
    //     //     const element = modelData[key];
    //     // }
    //     console.log(modelData[key]);
    // }

    return (
        <div className="popup-overlay">
            <span className="popup-background" >
                <img src={closebox} onClick={onClose} className='close' alt="Close" />
                <p className="paraWeekDate" id="paraWeekDate">Week Details :{modelData?.fromDate} to {modelData?.toDate}</p>
            </span>
            <div className="popup-modal">
                <div className="table_formatting">


                    <h3 style={{ color: 'black', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>From {formatDate(modelData?.fromDate)} to {formatDate(modelData?.toDate)}</h3>
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
                            {
                                data && data.map((userdata, index) => {

                                    return (
                                        <tr key={index}><td>{userdata.username}</td><td>MP Gift ID</td><td>2000 ANDROID Game</td><td>13212</td><td>{userdata.profit}</td></tr>
                                    )
                                })
                            }

                        </tbody>
                        <tfoot>
                            <tr><td colSpan="5">Total Point Used : {totals?.totalProfit}</td></tr>
                        </tfoot>
                    </table>

                    <div>Total Points Used</div>
                    <table>
                        <thead>
                            <tr><th>Type</th><th>Total Points</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Your Members Played in Other Agents CyberCafe</td><td>{totals?.totalProfit}</td></tr>
                        </tbody>
                        <tfoot>
                            <tr><td colSpan="2">Total Point Used : {totals?.totalProfit}</td></tr>
                        </tfoot>
                    </table>

                    <div className="DetailsDiv">
                        <p>In this week your revenue is at <span style={{ color: '#CC3300' }}>{totals?.totalProfit < 0 ? 0 : totals?.usercommission}%</span></p>
                        <p>Due to earning in this week, the company would able to provide you <span style={{ color: '#CC3300' }}>

                            {totals?.totalProfit < 0 ? "0" : totals?.totalProfit * totals?.usercommission / 100}

                        </span> points as a gift</p>
                        <p>0% of your points are being deducted with respect to your loan towards the company.</p>
                        <p>Previous Loan : 0</p>
                        <p>Actual Points : {totals?.totalProfit}</p>
                        <p>Deducted Points : 0</p>
                        <p>Loan Remaining : No Record Found</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerModel;
