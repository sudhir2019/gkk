import React from 'react';
import { Link } from 'react-router-dom';
import RefreshButton from "../assets/images/RefreshButton.png";
import useLogin from "../hook/Authentication/useLogin";

const Home = () => {
    const {
        register,
        handleSubmit,
        errors,
        onSubmit,
        isLoading,
        serverError,
        successMessage,
        captcha,
        generateCaptcha,
        locationError,
        isLocationAvailable,
        showLocationPopup,
        checkLocationPermission,
    } = useLogin();


    return (
        <div className="login">
            <div className="error-msg2">
                {/* <span id="locationErrorMsg" style={{ display: locationError ? 'block' : 'none' }}>
                    {locationError}
                </span> */}
                {showLocationPopup && (
                    <div className="location-popup">
                        <button onClick={checkLocationPermission}>Retry</button>
                        <p>⚠️ Location access is blocked! Please allow it in browser settings.{locationError}</p>

                    </div>
                )}
            </div>
            <div className="login2"></div>
            <div className="title"></div>
            <div className="text-center" style={{ marginTop: "2px", position: "absolute", left: "40%" }}>
                {/* Error Messages */}
                {errors.userName && (
                    <p className="error-text">{errors.userName.message}</p>
                )}
                {errors.userPassword && (
                    <p className="error-text">{errors.userPassword.message}</p>
                )}
                {errors.captchaInput && (
                    <p className="error-text">{errors.captchaInput.message}</p>
                )}
                {serverError && <p className="error-text">{serverError}</p>}
            </div>

            <div className="text-center" style={{ marginTop: "4px" }}>
                {/* Success Message */}
                {successMessage && <p className="success-text">{successMessage}</p>}
            </div>

            {/* Add CSS for better styling */}
            <style>
                {`
                        .text-center {
                        text-align: center;
                        }
                        .error-text {
                        color: red;
                        font-size: 12px;
                        margin-top: 4px;
                        }
                        .success-text {
                        color: green;
                        font-size: 12px;
                        margin-top: 4px;
                        }
                    `}
            </style>

            {/* Navigation Links */}
            <div className="navigation">
                <ul>
                    <li><Link to="#">About Us</Link></li> |
                    <li><Link to="#">MGM</Link></li> |
                    <li><Link to="#">Tutorials</Link></li> |
                    <li><Link to="#">FAQ's</Link></li> |
                    <li><Link to="#">Downloads</Link></li> |
                    <li><Link to="/Contact">Contact Us</Link></li>
                </ul>
            </div>
            {/* Login Form */}
            <div className="login-box">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <table>
                        <tbody>
                            <tr style={{ position: "relative" }}>
                                <td>Login</td>
                                <td align="right" >
                                    <input
                                        type="text"
                                        {...register("userName", { required: "Username is required" })}
                                        className="form-input"
                                        autoComplete="off"
                                    />
                                </td>

                                <td>
                                    <span id="reqUserID" style={{ color: 'Red', visibility: 'hidden' }}>*</span>
                                    <span id="regUserID" style={{ color: 'Red', visibility: 'hidden' }}>*</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td align="right">
                                    <input
                                        type="password"
                                        {...register("userPassword", { required: "Password is required" })}
                                        className="form-input"
                                        autoComplete="off"
                                    />
                                </td>


                                <td>
                                    <span id="reqPassword" style={{ color: 'Red', visibility: 'hidden' }}>*</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Enter Below Number</td>
                                <td align="right">
                                    <input
                                        type="text"
                                        {...register("captchaInput", { required: "Captcha is required" })}
                                        className="form-input"
                                    />
                                </td>


                                <td>
                                    <span id="reqCaptcha" style={{ color: 'Red', visibility: 'hidden' }}>*</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3" align="center" valign="middle">
                                    <div style={{ display: "flex", justifyContent: "start", alignItems: "center", alignContent: "center", gap: 2 }}>
                                        <div style={{ border: "2px", borderStyle: "solid", borderColor: "#e9898d", paddingLeft: "2px", paddingRight: "2px", paddingTop: "7px", fontSize: "16px", width: "80px", height: "14px", background: "#fbffff", color: "#315a38", fontStyle: "italic" }}>
                                            {captcha}
                                        </div>
                                        <div className="captcha-refresh" style={{ cursor: "pointer", display: "inline-block" }} onClick={generateCaptcha}>
                                            <img src={RefreshButton} alt="Refresh Captcha" style={{ width: "26px", height: "26px" }} />
                                        </div>
                                        <input
                                            type="submit"
                                            name="btnLogin"
                                            value={isLoading ? "GO..." : "GO"}
                                            disabled={!isLocationAvailable || isLoading}
                                            id="btnLogin"
                                            onClick={(e) => {
                                                if (!isLocationAvailable || isLoading) return; // Prevent click if not allowed
                                                handleSubmit(onSubmit)(e); // Trigger form submission
                                            }}
                                        />
                                    </div>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            {/* Footer */}
            <div className="rights" style={{ top: "160px" }}>All Rights Reserved "funrep.pro"</div>
        </div>
    );
};

export default Home;
