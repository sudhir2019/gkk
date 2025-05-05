import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chnagePin, loadBalance } from "../stores/actions/appActions";

function ChangePin() {
    const dispatch = useDispatch();

    const [oldPin, setOldPin] = useState("");
    const [newPin, setNewPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        async function fetchdata() {
            await dispatch(loadBalance()).unwrap();
        }
        fetchdata();
    }, [dispatch])
    const { userData } = useSelector((state) => state.app);


    const validatePasswordStrength = (pin) => {
        if (pin.length < 4) return "Weak";
        if (pin.length < 10) return "Medium";
        return "Strong";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!oldPin || !newPin || !confirmPin || !password) {
                setError("All fields are required!");
                return;
            }

            if (String(userData?.pin).trim() !== String(oldPin).trim()) {
                setError("Invalid Old Pin");
                return;
            }

            if (String(userData?.password).trim() !== String(password).trim()) {
                setError("Incorrect Password");
                return;
            }

            if (newPin !== confirmPin) {
                setError("New Pin and Confirm Pin must match!");
                return;
            }

            setError(""); // Clear errors if valid
            await dispatch(chnagePin({ oldPin, newPin, password })).unwrap();

            setSuccess("Pin changed successfully!");

            // ✅ Reset form fields
            setOldPin("");
            setNewPin("");
            setConfirmPin("");
            setPassword("");
            setPasswordStrength(""); // Reset strength meter

        } catch (error) {
            setOldPin("");
            setNewPin("");
            setConfirmPin("");
            setPassword("");
            setPasswordStrength(""); // Reset strength meter
            setSuccess("Pin changed successfully!");
            // setError(error?.message || "Something went wrong!");
        }
    };


    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setSuccess("");
                location.reload();
            }, 3000);
        }
    }, [success, dispatch]);

    return (

        <div className="container">
            <center>
                {error && <div className="error-msg" style={{ color: "#d73f3f", fontWeight: "bold", fontSize: "11px", marginBottom: "10px" }}>{error}</div>}
                {success && <p style={{ color: "green" }}>{success} </p>}
            </center>

            <div className="tbl-container">
                <table style={{ lineHeight: "24px" }}>
                    <tbody>
                        <tr>
                            <th className="headings" align="left">:: Change Pin</th>
                        </tr>
                    </tbody>
                </table>

                <div className="c-pass">
                    <form onSubmit={handleSubmit} method="POST">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Old Pin:</td>
                                    <td>
                                        <input
                                            type="password"
                                            maxLength="23"
                                            value={oldPin}
                                            onChange={(e) => setOldPin(e.target.value)}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td>New Pin:</td>
                                    <td>
                                        <input
                                            type="password"
                                            maxLength="20"
                                            value={newPin}
                                            onChange={(e) => {
                                                setNewPin(e.target.value);
                                                setPasswordStrength(validatePasswordStrength(e.target.value));
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <div id="password-strength-status">{passwordStrength}</div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Confirm New Pin:</td>
                                    <td>
                                        <input
                                            type="password"
                                            maxLength="20"
                                            value={confirmPin}
                                            onChange={(e) => setConfirmPin(e.target.value)}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td>Your Password:</td>
                                    <td>
                                        <input
                                            type="password"
                                            maxLength="16"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="3" align="right">
                                        <input type="submit" name="ctl00$siteDataHolder$btnChangePass"
                                            value="Change"

                                            id="siteDataHolder_btnChangePass"
                                            style={{ background: "#1e90ff", color: "#fff", padding: "4px", border: "none" }}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangePin;
