import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chnagePassword, loadBalance } from "../stores/actions/appActions";
function ChangePassword() {
    const dispatch = useDispatch();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        async function fetchdata() {
            await dispatch(loadBalance()).unwrap();
        }
        fetchdata();
    }, [dispatch])
    const { userData } = useSelector((state) => state.app);



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (String(userData?.password).trim() !== String(oldPassword).trim()) {
                setError("Old password does not exist.");
                return;
            }

            if (!oldPassword || !newPassword || !confirmPassword || !pin) {
                setError("All fields are required!");
                return;
            }

            if (newPassword !== confirmPassword) {
                setError("New password and confirm password must match!");
                return;
            }

            if (Number(userData?.pin) !== Number(pin)) {
                setError("Invalid Pin");
                return;
            }

            setError(""); // Clear errors if valid

            // Dispatch the change password action
            await dispatch(chnagePassword({ newPassword, pin })).unwrap();

            setSuccess("Password successfully changed!");
        } catch (error) {
            setSuccess(error?.message || "Something went wrong");
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
                                <th className="headings" align="left">:: Change Password</th>
                            </tr>
                        </tbody>
                    </table>

                    <div className="c-pass">
                        <form onSubmit={handleSubmit} method="POST">
                            <table style={{ lineHeight: "24px" }}>
                                <tbody>
                                    <tr>
                                        <td>Old Password:</td>
                                        <td>
                                            <input type="password" maxLength="23" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>New Password:</td>
                                        <td>
                                            <input type="password" maxLength="20" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Confirm New Password:</td>
                                        <td>
                                            <input type="password" maxLength="20" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Your Pin:</td>
                                        <td>
                                            <input type="password" maxLength="16" value={pin} onChange={(e) => setPin(e.target.value)} />
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

export default ChangePassword;
