import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBalance, addResult, loadGameData } from '../../../stores/actions/liveActions';
import socket from '../../../utils/socketinstance';


// export default function useSelectedGame({ gameId, adminId }) {
//     const dispatch = useDispatch();
//     const [loading, setLoading] = useState(true);  // Added loading state
//     const [error, setError] = useState(null);

//     const [timer, setTimer] = useState('');
//     const [balance, setBalance] = useState('');
//     const [boosterValue, setBoosterValue] = useState(1);
//     const [result, setResult] = useState('');   // Added error state
//     const { gameData } = useSelector((state) => state.live);
//     const [data, setData] = useState([]);
//     useEffect(() => {
//         const fetchGameData = async () => {
//             try {
//                 await dispatch(loadGameData({ adminId, gameId })).unwrap();
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.message);
//                 setLoading(false);
//             }
//         };
//         fetchGameData();
//     }, [gameId, adminId, dispatch]);



//     const handleReuslt = (e, values) => {
//         setResult(values);
//     }

//     const handleBoosterInput = (e) => {
//         setBoosterValue(e.target.value);
//     }




//     const addBalanceButton = async () => {
//         if (balance === "" || balance === null || parseInt(balance) <= 0) {
//             alert("Please enter a valid balance greater than 0.");
//             return;  // Return early to prevent further execution if the condition is true
//         }
//         try {
//             // Dispatch action to add balance

//             const response = await dispatch(addBalance({ gameId: gameId, adminId: adminId, balance: balance, type: "add" })).unwrap();

//             // Check if response is successful and show success message
//             if (response.success === true) {
//                 // You can replace 'response.success' with the actual key that denotes success from your API
//                 alert('Balance added successfully!');
//                 setBalance('');
//             } else {
//                 alert('Failed to add balance. Please try again.');
//             }
//         } catch (error) {
//             // Catch any error and display an error message
//             // console.error(error);
//             alert('Error occurred while adding balance!');
//         }
//     };


//     const saveResult = async () => {
//         if (result === "" || result === null) {
//             alert("Please enter a valid result.");
//             return;  // Return early to prevent further execution if the condition is true
//         }
//         try {
//             // Dispatch action to add balance

//             const response = await dispatch(addResult({ gameId: gameId, adminId: adminId, result: result, boosterValue: boosterValue })).unwrap();

//             // Check if response is successful and show success message
//             if (response.success === true) {
//                 // You can replace 'response.success' with the actual key that denotes success from your API
//                 alert('Result added successfully!');
//                 setResult('');
//             } else {
//                 alert('Failed to add result. Please try again.');
//             }
//         } catch (error) {
//             // Catch any error and display an error message
//             // console.error(error);
//             alert('Error occurred while adding result!');
//         }
//     }


  


//     useEffect(() => {
//         // Emit the 'timerData' event when the component mounts or when adminId or gameId changes

//         socket.on('connect', () => {
//             console.log('Socket connected');
//             // var newadminId = "67dd27f0cc614bf406531708";
//             // var newgameId = "jhZxPGid";
//             socket.emit('timerData', { adminId, gameId}); // Emit timer data after connection

//         });



//             // Listen for the connection acknowledgment
//             socket.on('connectionAck', (message) => {
//                 console.log('Server response:', message);  // Logs 'Connected to server' if connection is successful
//             });

//             // Listen for the 'timer' event to update the timer state
//             socket.on('timer', (data) => {
//                 setTimer(data);  // Update the state with the received timer value
//                 // console.log(data);
//             });

//             socket.emit('calculateData', { adminId: adminId, gameId: gameId });

//             socket.on('calculateDataResponse', (response) => {
//                 if (response.success) {
//                     setData(response.data);  // Set the game data response
//                     setLoading(false);        // Set loading to false after data is fetched
//                 } else {
//                     setError(response.message); // Set error message
//                     setLoading(false);           // Stop loading on error
//                 }
//             });

        
//         return () => {
//             socket.off('timerData');        // Remove listener for 'timerData' event
//             socket.off('connectionAck');    // Remove listener for connection acknowledgment
//             socket.off('timer');
//             socket.off('calculateData');
//             socket.off("calculateDataResponse");
//         };
//     }, [adminId, gameId, data]);


//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }



//     return { gameData, loading, error, balance, result, handleReuslt, setBalance, addBalanceButton, saveResult, removeBalanceButton, handleBoosterInput, timer, data };  // Now returns loading and error state
// }
