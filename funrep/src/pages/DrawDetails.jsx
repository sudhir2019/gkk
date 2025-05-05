import React, { useEffect, useState } from 'react'

import api from '../utils/axiosInstance';
import { useSelector } from 'react-redux';

function DrawDetails() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const { authUser } = useSelector((state) => state.auth);

    useEffect(() => {
        loadDrawDetails();
    }, []);

    async function loadDrawDetails() {
        try {
            setLoading(true);
            const response = await api.get(`/funrep/drawdetails`);
            setData(response.data?.data || {});
        } catch (error) {
            console.error("Error fetching draw details", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className='text-center' style={{textAlign:"center",fontSize:"16px"}}>Loading...</div>;
    }
    return (

        <div className="fun-rr" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 5, justifyContent: "center", alignItems: "center", alignContent: "center" }}>

            {Object.keys(data).map((gameId, index) => (
                <table style={{ width: "20%" }} key={index}>
                    <thead>
                        <tr>
                            <td><h2>{data[gameId]?.gameName}</h2></td>
                        </tr>
                    </thead>
                    <tbody><tr className="heading">
                        <td>
                            <table style={{ width: "100%" }}>
                                <tbody><tr>
                                    <td className="Newheading" style={{ width: "20%" }}>Sr. No.</td>
                                    <td className="Newheading" style={{ width: "20%" }}>Draw No.</td>
                                    <td className="Newheading" style={{ width: "60%" }}>Draw Time</td>
                                </tr>
                                </tbody></table>
                        </td>
                    </tr>
                        <tr>
                            <td className="data">
                                <div className="fun-r-body">
                                    <div>
                                        <table cellSpacing="0" rules="all" border="1" id="siteDataHolder_grdViewRoullet" style={{ borderCollapse: "collapse" }}>

                                            {data[gameId].results.length > 0 ? data[gameId].results.map((item, idx) => (
                                                <tbody>
                                                    <tr key={item._id} className={idx % 2 === 0 ? "alt-row" : ""}>
                                                        <td style={{ width: "30%" }}>{idx + 1}</td>

                                                        {
                                                            gameId === "zuuhVbBM" ? (
                                                                (() => {
                                                                    const split = item.drawno?.split("-") || [];
                                                                    const drawno = `${split[0] || ''}${split[1] || ''}${split[2] || ''}`;
                                                                    return <td style={{ width: "20%" }}>{drawno || 'NOT OPEN'}</td>;
                                                                })()
                                                            ) : (
                                                                <td style={{ width: "20%" }}>{item.drawno || 'NOT OPEN'}</td>
                                                            )
                                                        }
                                                        <td style={{ width: "60%" }}>{new Date(item.date).toLocaleString()}</td>

                                                    </tr>
                                                </tbody>
                                            )) : (
                                                <tr>
                                                    <td colSpan="4" style={{ textAlign: "center" }}>No data available for this game</td>
                                                </tr>
                                            )}
                                            {/* <tbody>
                                                <tr>
                                                <td style={{ width: "20%" }}>1</td><td style={{ width: "20%" }}>NOT OPEN</td><td style={{ width: "60%" }}>19-MAR-2025 08:19:03 PM</td>
                                            </tr>
                                            <tr className="alt-row">
                                                    <td style={{ width: "20%" }}>2</td><td style={{ width: "20%" }}>16</td><td style={{ width: "60%" }}>19-MAR-2025 08:18:03 PM</td>
                                                </tr><tr>
                                                    <td style={{ width: "20%" }}>3</td><td style={{ width: "20%" }}>5</td><td style={{ width: "60%" }}>19-MAR-2025 08:17:03 PM</td>
                                                </tr><tr className="alt-row">
                                                    <td style={{ width: "20%" }}>4</td><td style={{ width: "20%" }}>31</td><td style={{ width: "60%" }}>19-MAR-2025 08:16:03 PM</td>
                                                </tr><tr>
                                                    <td style={{ width: "20%" }}>5</td><td style={{ width: "20%" }}>36</td><td style={{ width: "60%" }}>19-MAR-2025 08:15:03 PM</td>
                                                </tr><tr className="alt-row">
                                                    <td style={{ width: "20%" }}>6</td><td style={{ width: "20%" }}>3</td><td style={{ width: "60%" }}>19-MAR-2025 08:14:03 PM</td>
                                                </tr><tr>
                                                    <td style={{ width: "20%" }}>7</td><td style={{ width: "20%" }}>30</td><td style={{ width: "60%" }}>19-MAR-2025 08:13:03 PM</td>
                                                </tr><tr className="alt-row">
                                                    <td style={{ width: "20%" }}>8</td><td style={{ width: "20%" }}>31</td><td style={{ width: "60%" }}>19-MAR-2025 08:12:03 PM</td>
                                                </tr>
                                            </tbody> */}
                                        </table>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

            ))};



        </div>
    )
}

export default DrawDetails