import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBalance, loadUsers, resetPinPassword } from "../stores/actions/appActions";

function ResetPinPassword() {
    const dispatch = useDispatch();
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedSettingType, setSelectedSettingType] = useState("pin"); // ✅ Track setting type
    const [userList, setUserList] = useState([]); // ✅ Stores selected users
    const [error, setError] = useState(""); // ✅ Stores selected users
    const [success, setSuccess] = useState(""); // ✅ Stores selected users
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(loadBalance()).unwrap();
                await dispatch(loadUsers()).unwrap();
            } catch (error) {
                console.error("❌ API Error:", error);
            }
        };
        fetchData();
    }, [dispatch]);

    const { treeData, userData } = useSelector((state) => state.app);

    // ✅ Handle dropdown selection for user
    const handleSelectChange = (e) => {
        const selectedUserId = e.target.value;
        const selected = treeData.find((user) => user._id === selectedUserId);
        setSelectedUser(selected);
    };

    // ✅ Handle dropdown selection for setting type
    const handleSettingTypeChange = (e) => {
        setSelectedSettingType(e.target.value);
    };

    // ✅ Handle "Add Details" button click
    const handleAddDetails = () => {
        if (selectedUser) {
            // ✅ Prevent duplicate entries
            const exists = userList.some(user => user.id === selectedUser._id);
            if (!exists) {
                const newUser = {
                    id: selectedUser._id,
                    username: selectedUser.username,
                    pin: selectedUser.pin || "N/A", // ✅ Get pin from treeData
                    password: selectedUser.password || "N/A", // ✅ Get password from treeData
                    settingType: selectedSettingType, // ✅ Store selected setting type
                };
                setUserList((prev) => [...prev, newUser]);
            }
        }
    };


    const generateRandomPin = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();
    };

    // ✅ Generate a random alphanumeric password (8 characters)
    const generateRandomPassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // ✅ Only capital letters
        return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    };


    const handleResetOption = () => {
        if (confirm("Are you Sure?")) {
            // Generate updated user list
            const updatedUserList = userList.map((user) => {
                let updatedPin = user.pin;
                let updatedPassword = user.password;

                if (user.settingType === "pin") {
                    updatedPin = generateRandomPin();
                } else if (user.settingType === "password") {
                    updatedPassword = generateRandomPassword();
                } else if (user.settingType === "pinpassword") {
                    updatedPin = generateRandomPin();
                    updatedPassword = generateRandomPassword();
                }

                return { ...user, pin: updatedPin, password: updatedPassword };
            });

            // Update state with new user list
            setUserList(updatedUserList);

            // Call reset with updated user list


            if (updatedUserList.length > 0) {
                reset(updatedUserList);
            }


        }
    };

    async function reset(updatedUserList) {
        try {

            await dispatch(resetPinPassword(updatedUserList)).unwrap();
            setSuccess("Successfully reset pin and password!");


        } catch (error) {
            setError(error);
            console.log("Error resetting pin/password:", error);
        }
    }

    function handleResetAll() {
        setUserList([]);
    }
    return (
        <div>
    
            {userData?.role === "player" ? (
                <>
                    <p className="wel-msg">You are not authorized to view this page.</p>
                    <p className="wel-msg">No Member is Registered Under Your Agent ID.</p>
                </>
            ) : (
                <center>

                    <center>
                        {error && <div className="error-msg" style={{ color: "#d73f3f", fontWeight: "bold", fontSize: "11px", marginBottom: "10px" }}>{error}</div>}
                        {success && <p style={{ color: "green" }}>{success} </p>}
                    </center>


                    <table style={{ width: "50%", textAlign: "center", borderCollapse: "collapse", border: "1px solid #837878" }}>
                        <tbody>
                            <tr style={{ backgroundColor: "#dedede" }} >
                                <td style={{ border: "1px solid black", padding: "5px" }} align="center" colSpan={3}>
                                    <button type="button" style={{ color: "#fff", border: "none", background: "#1e90ff", padding: "6px", fontSize: "14px" }} onClick={handleResetOption}>
                                        Change Pin Password
                                    </button>
                                    &nbsp;  &nbsp;
                                    <button type="button" style={{ color: "#fff", border: "none", background: "#1e90ff", padding: "6px", fontSize: "14px" }} onClick={handleResetAll}>
                                        Reset Member ID
                                    </button>
                                </td>

                            </tr>


                            {/* ✅ Display selected users */}
                            {userList.length > 0 && (
                                <>
                                    <tr style={{ background: "#f0ecec" }}>
                                        <td style={{ border: "1px solid black", padding: "5px" }}>Member ID</td>
                                        <td style={{ border: "1px solid black", padding: "5px" }}>Required</td>
                                        <td style={{ border: "1px solid black", padding: "5px" }}>Reset Status</td>
                                    </tr>
                                    {userList.map((user, index) => (
                                        <tr key={index}>
                                            <td style={{ border: "1px solid black", padding: "5px" }}>{user.username}</td>
                                            <td style={{ border: "1px solid black", padding: "5px" }}>{check(user.settingType)}</td>
                                            <td style={{ border: "1px solid black", padding: "5px" }}>
                                                {user.pin} - {user.password}
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}

                            <tr>
                                <td style={{ border: "1px solid black", padding: "5px" }}>&nbsp;</td>
                                <td style={{ border: "1px solid black", padding: "5px" }}>&nbsp;</td>
                            </tr>

                            <tr style={{ background: "#939393" }}>
                                <td style={{ border: "1px solid black", padding: "5px" }} align="center">
                                    <select name="selectedTree" style={{ fontSize: "14px" }} onChange={handleSelectChange}>
                                        <option value="">Select </option>
                                        {treeData &&

                                            treeData.map((tree) => (

                                                <option key={tree._id} value={tree._id}>
                                                    {tree.username}
                                                </option>
                                            ))}
                                    </select>
                                </td>
                                <td>
                                    <select name="settingType" value={selectedSettingType} onChange={handleSettingTypeChange}>
                                        <option value="pin">Need Pin</option>
                                        <option value="password">Need Password</option>
                                        <option value="pinpassword">Need Both</option>
                                    </select>
                                </td>
                                <td style={{ border: "1px solid black", padding: "5px" }} align="center">


                                    <button type="button" onClick={handleAddDetails} style={{ color: "#fff", border: "none", background: "#1e90ff", padding: "6px", fontSize: "14px" }}>
                                        Add Details
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </center>
            )}
        </div>
    );
}

function check(type) {
    if (type === "pin") {
        return "Need Pin";
    } else if (type === "password") {
        return "Need Password";
    } else {
        return "Need Both";
    }
}
export default ResetPinPassword;
