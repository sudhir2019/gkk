import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';


import socket from '../../utils/socketinstance';
import api from '../../utils/axiosInstance';
import useTimer from '../../hooks/admin/games/useTimer';
import useGameData from '../../hooks/admin/games/useGameData';
import { addBalance, addResult } from '../../stores/actions/liveActions';

function AndharBaharComponent({ adminId, gameId }) {
    const dispatch = useDispatch();
    const [balance, setBalance] = useState('');
    const [boosterId, setBootserId] = useState('');
    const [resultFunTarget, setResultFunTarget] = useState('');   // Added error state
    const [resultColor, setResultColor] = useState('');   // Added error state
    const [resultCardType, setResultCardType] = useState('');   // Added error state
    const [successMessage, setSucceessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const timer = useTimer(adminId, gameId);
    // const { data, loading, reload } = useLiveData(adminId, gameId); 
    const { data, loading, reload } = useGameData(adminId, gameId);
    // const [data,setData] = useState([]);
    const removeBalanceButton = async () => {

        try {
            // Dispatch action to add balance
            const response = await dispatch(addBalance({ gameId: gameId, adminId: adminId, balance: balance, type: "remove" })).unwrap();

            // Check if response is successful and show success message
            if (response.success === true) {
                // You can replace 'response.success' with the actual key that denotes success from your API
                alert('Balance Reset successfully!');
                setBalance('');
            } else {
                alert('Failed to add balance. Please try again.');
            }
        } catch (error) {
            // Catch any error and display an error message
            // console.error(error);
            alert('Error occurred while adding balance!');
        }
    };

    const addBalanceButton = async () => {
        if (balance === "" || balance === null || parseInt(balance) <= 0) {
            alert("Please enter a valid balance greater than 0.");
            return;  // Return early to prevent further execution if the condition is true
        }
        try {
            // Dispatch action to add balance

            const response = await dispatch(addBalance({ gameId: gameId, adminId: adminId, balance: balance, type: "add" })).unwrap();

            // Check if response is successful and show success message
            if (response.success === true) {
                // You can replace 'response.success' with the actual key that denotes success from your API
                alert('Balance added successfully!');
                setBalance('');
            } else {
                alert('Failed to add balance. Please try again.');
            }
        } catch (error) {
            // Catch any error and display an error message
            // console.error(error);
            alert('Error occurred while adding balance!');
        }
    };



    const handleFuntargetResult = (e, values) => {
        setResultFunTarget(values);
    }


    const handlecolor = (e, values) => {
        setResultColor(values);
    }

    const handleCardtType = (e, values) => {
        setResultCardType(values);
    }





    const saveResultAB = async () => {
        if (resultFunTarget === "" || resultFunTarget === null || resultColor === "" || resultColor === null || resultCardType === "" || resultCardType === null) {
            alert("Please enter a valid result.");
            return;  // Return early to prevent further execution if the condition is true
        }
        try {
            // Dispatch action to add balance

            const response = await dispatch(addResult({ gameId: gameId, adminId: adminId, result: resultFunTarget, color: resultColor, type: resultCardType, boosterValue: boosterId })).unwrap();

            // Check if response is successful and show success message
            if (response.success === true) {
                // You can replace 'response.success' with the actual key that denotes success from your API
                setSucceessMessage('Result added successfully!');
                setResultFunTarget('');
                setResultCardType('');
                setResultColor('');
            } else {
                setErrorMessage('Failed to add result. Please try again.');
            }
        } catch (error) {
            // Catch any error and display an error message
            // console.error(error);
            setErrorMessage('Error occurred while adding result!');
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setSucceessMessage('');
            setErrorMessage('');



        }, 2000);
    }, [successMessage, errorMessage]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }


    return (
        <div className='card'>
            <div className="card-header d-flex justify-content-between">
                <h5 className="col-sm-2 card-title" >Andhar Bahar</h5>
                <div className='flex flex-row gap-2'>
                    <button type="button" id="reset" className="btn btn-primary" onClick={reload}><span aria-hidden="true">Refresh</span></button>
                    <button type="button" id="reset" className="btn btn-primary" onClick={removeBalanceButton}><span aria-hidden="true">Reset Balance</span></button>
                </div>
            </div>

            <div className='card-body'>
                <div className='row'>
                    <div className='col-md-8'>
                        <div className="w-full h-[400px] overflow-y-auto ">
                            <div className=" w-full mb-[20px]">
                                {data && data.data !== undefined && (
                                    <>
                                        {/* First Row - 6 cards */}
                                        <div className="flex flex-wrap gap-1 mb-[10px]">
                                            {data.data.slice(0, 6).map((obj, index) => (
                                                <button
                                                    key={index}
                                                    className={`rounded w-[100px]  text-center relative hover:bg-red-400 ${resultFunTarget === obj.drawno ? "bg-red-400" : "bg-gray-200"
                                                        }`}
                                                    onClick={(e) => handleFuntargetResult(e, obj.drawno)}
                                                >
                                                    <p className="text-sm font-bold mt-[1px] text-gray-800">{obj.label}</p>
                                                    <img src={obj.image} className="mx-auto my-1 h-12 w-8" />
                                                    <input
                                                        name="drawtotal"
                                                        style={{ fontSize: "10px" }}
                                                        className={`w-full text-center text-gray-800 ${obj.sum > 0 ? "bg-red-400" : "bg-transparent"}`}
                                                        value={obj.sum || 0}
                                                        readOnly
                                                    />
                                                </button>
                                            ))}
                                        </div>

                                        <div className="flex flex-wrap gap-1 mb-[10px]">
                                            {data.data.slice(6, 7).map((obj, index) => (
                                                <button
                                                    key={index}
                                                    className={`rounded w-[100px] text-center relative hover:bg-red-400 ${resultFunTarget === obj.drawno ? "bg-red-400" : "bg-gray-200"
                                                        }`}
                                                    onClick={(e) => handleFuntargetResult(e, obj.drawno)}
                                                >
                                                    <p className="text-sm font-bold mt-[1px] text-gray-800">{obj.label}</p>
                                                    <img src={obj.image} className="mx-auto my-1 h-12 w-8" />
                                                    <input
                                                        name="drawtotal"
                                                        style={{ fontSize: "10px" }}
                                                        className={`w-full text-center text-gray-800 ${obj.sum > 0 ? "bg-red-400" : "bg-transparent"}`}
                                                        value={obj.sum || 0}
                                                        readOnly
                                                    />
                                                </button>
                                            ))}
                                        </div>

                                        {/* Second Row - 7 cards */}
                                        <div className="flex flex-wrap gap-1 mb-[10px]">
                                            {data.data.slice(7, 13).map((obj, index) => (
                                                <button
                                                    key={index}
                                                    className={`rounded w-[100px] text-center relative hover:bg-red-400 ${resultFunTarget === obj.drawno ? "bg-red-400" : "bg-gray-200"
                                                        }`}
                                                    onClick={(e) => handleFuntargetResult(e, obj.drawno)}
                                                >
                                                    <p className="text-sm font-bold mt-[1px] text-gray-800">{obj.label}</p>
                                                    <img src={obj.image} className="mx-auto my-1 h-12 w-8" />
                                                    <input
                                                        name="drawtotal"
                                                        style={{ fontSize: "10px" }}
                                                        className={`w-full text-center text-gray-800 ${obj.sum > 0 ? "bg-red-400" : "bg-transparent"}`}
                                                        value={obj.sum || 0}
                                                        readOnly
                                                    />
                                                </button>
                                            ))}
                                        </div>

                                        {/* Third Row - Last 6 cards */}
                                        <div className="grid grid-cols-6  gap-1 mb-[10px]">
                                            {data.data.slice(13).map((obj, index) => (
                                                <button
                                                    key={index}
                                                    className={`rounded w-[100px] text-center relative hover:bg-red-400 ${resultCardType === obj.drawno ? "bg-red-400" : "bg-gray-200"
                                                        }`}
                                                    onClick={(e) => handleFuntargetResult(e, obj.drawno)}
                                                >
                                                    <p className="text-sm font-bold mt-[1px] text-gray-800">{obj.label}</p>
                                                    <img src={obj.image} className="mx-auto my-1 h-12 w-8" />
                                                    <input
                                                        name="drawtotal"
                                                        style={{ fontSize: "10px" }}
                                                        className={`w-full text-center text-gray-800 ${obj.sum > 0 ? "bg-red-400" : "bg-transparent"}`}
                                                        value={obj.sum || 0}
                                                        readOnly
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}









                            </div>
                            <div className='grid grid-cols-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-1 w-full mb-[20px]'>
                                {data && data.dataColors !== undefined && data.dataColors.map((obj, index) => (
                                    <button
                                        key={index}
                                        className={`rounded text-center relative hover:bg-red-400 text-center  ${resultColor === obj.label ? "bg-red-400" : "bg-gray-200"
                                            }`}
                                        onClick={(e) => handlecolor(e, obj.label)}
                                    >
                                        <p className="text-sm font-bold mt-[1px] text-gray-800">
                                            {obj.label}
                                        </p>
                                        <img src={obj.image} className="mx-auto my-1 h-8 w-8" />

                                        <input
                                            name="drawtotal"
                                            style={{ fontSize: "10px" }}
                                            className={`w-full text-center text-gray-800 ${obj.sum > 0 ? "bg-red-400" : "bg-transparent"}`}
                                            value={obj.sum || 0}
                                            readOnly
                                        />
                                    </button>
                                ))}
                            </div>

                            <div className='grid grid-cols-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-1 w-full mb-[20px]'>
                                {data && data.dataCardTypes !== undefined && data.dataCardTypes.map((obj, index) => (
                                    <button
                                        key={index}
                                        className={`rounded text-center relative hover:bg-red-400 text-center  ${resultCardType === obj.drawno ? "bg-red-400" : "bg-gray-200"
                                            }`}
                                        onClick={(e) => handleCardtType(e, obj.drawno)}
                                    >
                                        <p className="text-sm font-bold mt-[1px] text-gray-800">
                                            {obj.label}
                                        </p>


                                        <input
                                            name="drawtotal"
                                            style={{ fontSize: "10px" }}
                                            className="w-full bg-transparent text-center text-gray-800"
                                            value={obj.sum || 0}
                                            readOnly
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form id="myFormID" name="myform">
                            <div className="form-group row">
                                <div className="col-sm-4 mb-2">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="balance"
                                        name="balance"
                                        value={balance}
                                        onChange={(e) => setBalance(e.target.value)}
                                        min="1"
                                        placeholder="Enter your Balance"
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="col-sm-4">
                                    <button
                                        type="button"
                                        className="w-full btn btn-primary form-control delete-all"
                                        onClick={addBalanceButton}
                                    >
                                        Add Balance
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="col-md-4 mt-2 mb-24 ">
                        <span className='text-xl mb-2' id="countdown">Timer: {timer}</span>
                        <p>
                            <select name="boosterId" id="boosterId" className="browser-default custom-select" onChange={(e) => setBootserId(e.target.value)}>
                                {Array.from({ length: 2 }, (_, index) => (
                                    <option key={index} value={index + 1}>{index + 1}</option>
                                ))}
                            </select>
                        </p>
                        <div className="mt-2 mb-0 d-flex">
                            <input type="text" className="form-control mr-2 bg-green-100 font-bold text-md" name="SelectedCard" id="SelectedCard" value={resultFunTarget} readOnly={true} />
                            <input type="text" className="form-control mr-2 bg-green-100 font-bold text-md" name="SelectedColor" id="SelectedColor" value={resultColor} readOnly={true} />
                            <input type="text" className="form-control mr-2 bg-green-100 font-bold text-md" name="SelectedColor" id="SelectedColor" value={resultCardType} readOnly={true} />
                            <button type='button' className="btn btn-success" id="btnSave" name="btnSave" onClick={saveResultAB}>SAVE</button>
                        </div>

                        <div className='p-2 '>
                            {errorMessage && (
                                <p className='p-2 bg-red-400 text-white  font-semibold'>{errorMessage}</p>
                            )}
                            {successMessage && (
                                <p className='p-2 bg-green-400 text-white font-semibold'>{successMessage}</p>
                            )}
                        </div>

                        <div className="alert alert-success alert-dismissible fade" role="alert" id="alertId"></div>
                        <div className="alert alert-danger alert-dismissible fade" role="alert" id="alertIdR"></div>

                        <span id="idRes">Daily Collection &amp; Results</span>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>

                                    <td>TOTAL Game Balance: </td>
                                    <td align="right"><span id="tDayCollection">{data?.percentageData?.[0]?.gameBalance ?? 0}</span></td>
                                </tr>
                                <tr>
                                    <td>TOTAL COLLECTION: </td>
                                    <td align="right">{data?.collections?.totalPlaypoints ?? 0}</td>
                                </tr>
                                <tr>
                                    <td>TOTAL PAYMENT :</td>
                                    <td align="right">{data?.collections?.totalWinpoints ?? 0}</td>
                                </tr>
                                <tr>
                                    <td>BALANCE :</td>
                                    <td align="right">
                                        {(data?.collections?.totalPlaypoints ?? 0) - (data?.collections?.totalWinpoints ?? 0)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <center>
                            <table className="text-lg mt-2 self-center">
                                <tbody>
                                    <tr>
                                        {data?.lastData?.data?.map((result, index) => (
                                            <td key={index} className="bg-blue-200 px-2 py-2 border">
                                                <div className="flex flex-col items-center justify-center">
                                                    <img
                                                        src={`/assets/games/${result.drawno}.png`}
                                                        alt={`Draw ${result.drawno}`}
                                                        className="h-12 w-12 mb-1"
                                                    />
                                                    <span>{result.booster}X</span>
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </center>


                    </div>
                </div>
            </div>
        </div>
    );

}

export default AndharBaharComponent;
