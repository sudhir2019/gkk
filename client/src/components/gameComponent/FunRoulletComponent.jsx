import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';


import socket from '../../utils/socketinstance';
import api from '../../utils/axiosInstance';
import useTimer from '../../hooks/admin/games/useTimer';
import useGameData from '../../hooks/admin/games/useGameData';
import { addBalance, addResult } from '../../stores/actions/liveActions';
import TimerComponent from '../ui/TimerDisplay';

function FunRoulletComponent({ adminId, gameId }) {
    const dispatch = useDispatch();
    const [balance, setBalance] = useState('');
    const [boosterId, setBootserId] = useState('');
    const [resultFunTarget, setResultFunTarget] = useState('');   // Added error state

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


    const saveResult = async () => {
        if (resultFunTarget === "" || resultFunTarget === null) {
            alert("Please enter a valid result.");
            return;  // Return early to prevent further execution if the condition is true
        }
        try {
            // Dispatch action to add balance

            const response = await dispatch(addResult({ gameId: gameId, adminId: adminId, result: resultFunTarget, boosterValue: boosterId })).unwrap();

            // Check if response is successful and show success message
            if (response.success === true) {
                // You can replace 'response.success' with the actual key that denotes success from your API
                setSucceessMessage('Result added successfully!');
                setResultFunTarget('');
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
                <h5 className="col-sm-2 card-title" >Fun Roullet</h5>
                <div className='flex flex-row gap-2'>
                    <button type="button" id="reset" className="btn btn-primary" onClick={reload}><span aria-hidden="true">Refresh</span></button>
                    <button type="button" id="reset" className="btn btn-primary" onClick={removeBalanceButton}><span aria-hidden="true">Reset Balance</span></button>
                </div>
            </div>

            <div className='card-body'>
                <div className='row'>
                    <div className='col-md-8' >
                        <div className="grid grid-cols-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-2 p-2 w-full">
                            {data && data.data !== undefined && data.data.map((obj, index) => (
                                <div
                                    key={index}
                                    className="p-1 bg-gray-200 rounded hover:bg-green-200 text-center relative  "
                                    onClick={(e) => handleFuntargetResult(e, obj.drawno)}
                                >
                                    {/* <div className="absolute top-[-5px] left-1 transform -translate-x-1/2 h-4 w-4 bg-green-300 rounded-full text-xs flex items-center justify-center">
                                    {obj.drawno}
                                </div> */}

                                    <input
                                        type="radio"
                                        name="makeresult"
                                        className="h-4 w-4 absolute left-2 top-2"
                                        value={obj.drawno}
                                        onChange={(e) => handleFuntargetResult(e, obj.drawno)}
                                        checked={resultFunTarget === obj.drawno ? true : false}
                                    />

                                    <h1

                                        className={`text-lg font-bold mt-4 ${obj.color === "red"
                                            ? "text-red-600"
                                            : obj.color === "black"
                                                ? "text-gray-800 text-black"
                                                : "text-green-800"
                                            }`}
                                    >{obj.drawno}</h1>

                                    <input
                                        name="drawtotal"
                                        style={{ fontSize: "11px" }}
                                        className={`w-full  mt-2 text-center ${obj.color === "red"
                                            ? "bg-red-600 text-white"
                                            : obj.color === "black"
                                                ? "bg-gray-800 text-white"
                                                : "bg-green-800 text-white"
                                            }`}
                                        value={obj.sum || 0}
                                        readOnly
                                    />

                                </div>
                            ))}
                        </div>
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
                        {/* <span className='text-xl mb-2' id="countdown">Timer: {timer}</span> */}
                        <TimerComponent timer={timer} />
                        <p>
                            <select name="boosterId" id="boosterId" className="browser-default custom-select" onChange={(e) => setBootserId(e.target.value)}>
                                {Array.from({ length: 2 }, (_, index) => (
                                    <option key={index} value={index + 1}>{index + 1}</option>
                                ))}
                            </select>
                        </p>
                        <div className="mt-2 mb-0 d-flex">
                            <input type="text" className="form-control mr-2 bg-green-100 font-bold text-xl" name="SelectedCard" id="SelectedCard" value={resultFunTarget} readOnly={true} />
                            <button type='button' className="btn btn-success" id="btnSave" name="btnSave" onClick={saveResult}>SAVE</button>
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

                        <table className=' text-lg mt-2 self-center'>
                            <tr>
                                {
                                    data && data?.lastData?.data.map((result, index) => (
                                        <React.Fragment key={index}>
                                            <td className="bg-blue-200 px-2 py-2 border">{result.drawno} : {result.booster}X</td>

                                        </React.Fragment>
                                    ))
                                }
                            </tr>
                        </table>


                    </div>
                </div>
            </div>
        </div>
    );

}

export default FunRoulletComponent;
