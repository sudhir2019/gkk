
import $ from "jquery";
import React, { useEffect, useState } from "react";
import DataTable from "../components/TableComponents/DataTable";
import { GET } from "../utils/http";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Loader from "../components/ui/Loader";


const imageMap = {
    c: <b size="4">♦</b>,
    k: <b size="4">♠</b>,
    l: <b size="4">♥</b>,
    f: <b size="4">♣</b>,
};

export default function DrawDetails() {
    const { name, id } = useParams();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const { authUser } = useSelector((state) => state.auth);


    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await GET(`/playrep/drawdetails?gameId=${id}`);

            if (response.response && response.response.data) {
                const result = response.response.data.data;
                const fresult = result
                    .filter(item => item.drawno !== null)
                    .map((item, index) => {
                        const istDate = new Date(item.date).toLocaleString('en-US', {
                            timeZone: 'Asia/Kolkata',
                        });
                        const dateObj = new Date(istDate);
                        const day = String(dateObj.getDate()).padStart(2, '0');
                        const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
                        const year = dateObj.getFullYear();
                        const hours = dateObj.getHours() % 12 || 12;
                        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
                        const seconds = String(dateObj.getSeconds()).padStart(2, '0');
                        const ampm = dateObj.getHours() >= 12 ? 'PM' : 'AM';
                        const formattedDate = `${day}-${month}-${year} ${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;

                        let formattedDrawno = item.drawno;
                        if (id === "zuuhVbBM") {
                            formattedDrawno = item.drawno.replace(/-/g, '');
                        }

                        let drawColor = "";
                        let drawImage = "";
                        if (id === "qZicXikM") {
                            if (item.color === 'c' || item.color === 'l') {
                                drawColor = "red";
                            } else if (item.color === 'f' || item.color === 'k') {
                                drawColor = "black";
                            }
                            drawImage = imageMap[item.color] || "Not Open";
                        }

                        return {
                            SrNo: index + 1,
                            ...item,
                            drawno: formattedDrawno,
                            date: formattedDate,
                            drawColor,
                            drawImage
                        };
                    });
                setData(fresult);
            } else {
                console.error("Request failed:", response.response?.data || "No data");
            }
        } catch (error) {
            console.log("Error in fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    // console.log(data);
    useEffect(() => {
        fetchData();
    }, [name, id])

    const loadReport = () => {
        fetchData();
    }


    const getName = (gameId) => {
        switch (gameId) {
            case "qZicXikM":
                return "Fun AB";
            case "zuuhVbBM":
                return "Triple Fun";
            case "MNOQqWWi":
                return "Fun Target";
            case "vwRORrGO":
                return "Fun Roullet";
            default:
                return "Unknown Game";
        }
    };


    console.log(data);



    const config = {
        demoData: data,
        columnHeaders: ['Sr. No.', 'Winning No', 'Draw Time'],
        columnAttributes: [
            { columnName: 'SrNo', dataType: 'int' },
            {
                columnName: 'drawno',
                dataType: 'custom',
                render: (row) => {
                    return (
                        <div style={{ color: row.drawColor, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={{ paddingRight: '2px' }}>{row.drawImage}</span>
                            <span >{row.drawno}</span>
                        </div >

                    );
                }
            },
            { columnName: 'date', dataType: 'date' }
        ],
        keyColumn: '_id',
        gridStyle: {
            headerClass: 'GridHead',
            footerClass: 'GridFooter',
            rowClass: 'NormalRow',
            alternativeRowClass: 'AlternativeRow'
        },
        pageSetting: {
            allowPager: true,
            pageSize: 10
        },
        sortSetting: {
            allowSorting: true,
            sortColumn: 'SrNo',
            sortDirection: 'asc'
        },
        onSuccess: data => console.log("Loaded successfully:", data),
        onError: err => console.error("Load failed:", err)
    };



    return (
        <div className="container">
            <h2>{getName(id)}</h2>

            <div className="accordion">

                <div className="accordion">
                    {data.length > 0 ? (
                        <DataTable {...config} />
                    ) : (
                        <p style={{ textAlign: "center" }}></p>
                    )}
                </div>

            </div>
            {loading && <Loader show={loading} />}
        </div>
    )
}
