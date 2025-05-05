import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useSelectedGame from '../../../hooks/admin/games/useSelectedGame';
import mediaLocation from '../../../utils/mediaInstance';

function Test() {
    const { action, any, id } = useParams();

    const { data, balance, setBalance, handleReuslt, result, addBalanceButton, saveResult, removeBalanceButton, handleBoosterInput, timer } = useSelectedGame({ gameId: any, adminId: action });

    const gameData = data;
    console.log(gameData);

    const gameName = gameData?.gameData?.gameName;
    const nodigit = parseInt(gameData?.gameData?.nodigit);
    const imageData = gameData?.gameData?.GameImage;
    const label = gameData?.gameData?.label;
    const playData = gameData?.playData;
    const gameBalance = gameData?.percentageData?.[0]?.gameBalance || 0;

    const totalPlayPoints = gameData?.collection?.totalPlaypoints || 0;
    const totalWinPoints = gameData?.collection?.totalWinpoints || 0;
    const remaining = parseFloat(totalPlayPoints, 2) - parseFloat(totalWinPoints, 2);

    // console.log(playData?.[1]?.drawtotal);



    // const funtarget = Array.from({ length: 10 }, (_, i) => {
    //     const drawno = (i + 1) % 10; // 1 to 9, then 0
    //     return {
    //         label: drawno.toString(),
    //         drawno: drawno.toString(),
    //         image: "",
    //         color: "",
    //     };
    // });



    // const funroullet = Array.from({ length: 37 }, (_, i) => {
    //     const redNumbers = [
    //         1, 3, 5, 7, 9, 12, 14, 16, 18, 19,
    //         21, 23, 25, 27, 30, 32, 34, 36
    //     ];

    //     const color = i === 0 ? "green" : redNumbers.includes(i) ? "red" : "black";

    //     return {
    //         label: i.toString(),
    //         drawno: i.toString(),
    //         image: "",
    //         color: color,
    //     };
    // });

    // // Add "00" at the end
    // funroullet.push({
    //     label: "00",
    //     drawno: "00",
    //     image: "",
    //     color: "green",
    // });


    // const triplefun = [];

    // for (let i = 0; i <= 9; i++) {
    //     for (let j = 0; j <= 9; j++) {
    //         for (let k = 0; k <= 9; k++) {
    //             triplefun.push({
    //                 label: `${i}-${j}-${k}`,
    //                 drawno: `${i}${j}${k}`,  // Optional: full number without dashes
    //                 image: "",
    //                 color: ""
    //             });
    //         }
    //     }
    // }




    // const andharBahar = Array.from({ length: 13 }, (_, i) => {
    //     const drawno = i + 1; // Numbers 1 to 13 (A to K)
    //     return {
    //         label: drawno.toString(),
    //         drawno: drawno.toString(),
    //         image: `../../../../src/assets/games/${drawno}.png`, // Corrected Template String
    //         color: "",
    //     };
    // });


    // console.log(andharBahar);
    







    return (
        <div className='card'>


            <div className="card-header d-flex justify-content-between">
                <h5 className="col-sm-2 card-title" >{gameName}</h5>

                <button type="button" id="reset" className="btn btn-primary" onClick={removeBalanceButton}><span aria-hidden="true">Reset Balance</span></button>
            </div>


            <div className='card-body'>
                <div className='row'>
                    <div className='col-md-8'>
                        <div className="container">
                            {label === "no" && imageData.length === 0 ? (
                                <div className="row ">

                                    {Array.from({ length: nodigit }, (_, index) => {
                                        // We are assuming you want to display 6x6 grid, hence we ensure the rows
                                        return (
                                            <div className=" p-2 bg-gray-200 m-2 rounded hover:bg-green-200" key={index} style={{ width: "75px" }} onClick={(e) => handleReuslt(e, index)}>
                                                <div className='relative h-4 w-4 bg-green-200 top-[-15px] rounded-full text-center'>{index}</div>
                                                <input type="radio" name="makeresult" className="h-4 w-4 absolute " value={index} checked={result === index ? true : false} />
                                                <h1 className="text-2xl font-bold text-center text-black">{index}</h1> {/* No small width/height */}
                                                <input
                                                    name="drawtotal"
                                                    className="w-full text-lg  bg-red-100"
                                                    value={playData[index]?.drawtotal || 0}  // Adding a fallback for undefined values
                                                    readOnly={true}
                                                />
                                            </div>

                                        );
                                    })}
                                </div>

                            ) : (
                                <div className="row">
                                    {playData && playData.slice(0, playData.length / 2 * 6).map((item, index) => {  // Slice to ensure 36 images (6x6 grid)

                                        // console.log(item)
                                        const imagePath = item.image;
                                        const splitPath = imagePath.split('src\\storage\\upload')[1];
                                        const formattedPath = splitPath.replace(/\\/g, '/');
                                        const imageUrl = `${mediaLocation}/${formattedPath}`;

                                        // const drawTotal = playData[index] ? playData[index]?.drawtotal : "N/A"; // Default to "N/A"

                                        return (
                                            <div className="p-2 bg-gray-200 m-2 rounded " key={index} style={{ width: "120px" }} onClick={(e) => handleReuslt(e, index + 1)}>
                                                <div className='relative h-4 w-4 bg-green-200 top-[-15px] rounded-full text-center'>{index + 1}</div>
                                                <input type="radio" name="makeresult" className="h-4 w-4 absolute z-10" value={index + 1} checked={result === index + 1 ? true : false} />

                                                <img src={imageUrl} className="pl-4 w-18 mix-blend-multiply text-center self-center h-14" alt={`Image-${index}`} />
                                                <input name="drawtotal" className="w-full text-sm font-bold bg-red-100" value={item.drawtotal} readOnly={true} />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <div className='mb-10' />
                        <form id="myFormID" name="myform">
                            <div className="form-group row">
                                <div className="col-sm-4 mb-2">
                                    <input type="number" className="form-control" id="balance" name="balance" value={balance} onChange={(e) => setBalance(e.target.value)} min="1" placeholder="Enter your Balance" autoComplete='off' />
                                </div>
                                <div className="col-sm-4">
                                    <button type="button" className="w-full btn btn-primary form-control delete-all" onClick={addBalanceButton}>Add Balance</button>
                                </div>
                            </div>


                        </form>


                    </div>
                    <div className="col-md-4 mt-2 mb-24">

                        <span className='text-xl mb-2' id="countdown" >Timer: {timer}</span>
                        {/* <p>Total Expected Collection: <span id="TCollection">0.00</span>
                        </p>
                        <p>Total Expected Payment<span id="if_selected"></span>: <span id="totalPayment">0</span></p> */}

                        <p>
                            <select name="boosterId" id="boosterId" className="browser-default custom-select" onChange={(e) => handleBoosterInput(e)} >
                                {
                                    Array.from({ length: 20 }, (_, index) => (
                                        <option key={index} value={index + 1}>{index + 1}</option>
                                    ))
                                }

                            </select>
                        </p>
                        <div className="mt-2 mb-0 d-flex">
                            <input type="text" className="form-control mr-2 bg-green-100 font-bold text-xl" name="SelectedCard" id="SelectedCard" value={result} readOnly={true} />

                            <button type='button' className="btn btn-success" id="btnSave" name="btnSave" onClick={saveResult}>SAVE</button>
                        </div>
                        <div className="alert alert-success alert-dismissible fade" role="alert" id="alertId"></div>
                        <div className="alert alert-danger alert-dismissible fade" role="alert" id="alertIdR"></div>
                        <span id="idRes">Daily Collection &amp; Results</span>
                        <table className="table table-bordered">
                            <tbody><tr>
                                <td>TOTAL Game Balance: </td>
                                <td align="right"><span id="tDayCollection">{gameBalance}</span>
                                </td>
                            </tr>
                                <tr>
                                    <td>TOTAL COLLECTION: </td>
                                    <td align="right">{totalPlayPoints}
                                    </td>
                                </tr>
                                <tr>
                                    <td>TOTAL PAYMENT :</td>
                                    <td align="right">{totalWinPoints}
                                    </td>
                                </tr>
                                <tr>
                                    <td>BALANCE :</td>
                                    <td align="right">{remaining}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Test