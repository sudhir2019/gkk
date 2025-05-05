import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { sendContact } from '../stores/actions/appActions';

const logoPath = "./src/assets/images/logo.png";
const refreshPath = "./src/assets/images/RefreshButton.png";

const Contact = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        enquiryType: 'C' ,
        fullName: '',
        mobile: '',
        email: '',
        complaintDetails: '',
        captcha: '',
    });

    const [errors, setErrors] = useState({});
    const [captcha, setCaptcha] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        fetchCaptcha();
    }, []);

    const fetchCaptcha = () => {
        setCaptcha(`/GenerateCaptcha.aspx?${Date.now()}`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        if (!formData.fullName) {
            newErrors.fullName = 'Please provide full name.';
            isValid = false;
        }

        if (!formData.mobile || formData.mobile.length !== 10) {
            newErrors.mobile = 'Please provide a valid 10-digit mobile number.';
            isValid = false;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!formData.email || !emailPattern.test(formData.email)) {
            newErrors.email = 'Please provide a valid email ID.';
            isValid = false;
        }

        if (!formData.complaintDetails) {
            newErrors.complaintDetails = 'Please provide details for your complaint.';
            isValid = false;
        }

        if (!formData.captcha) {
            newErrors.captcha = 'Please Enter Below Code.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        if (validateForm()) {
            try {
                await dispatch(sendContact(formData)).unwrap();
                setSuccessMessage('Complaint submitted successfully!');
                setFormData({ fullName: '', mobile: '', email: '', complaintDetails: '', captcha: '' });
                GenerateCaptcha();
            } catch (error) {
                setErrorMessage('Failed to submit complaint. Please try again.');
                console.error("Error in submitting complaint:", error);
            }
        }
    };


    useEffect(() => {

        GenerateCaptcha();
    }, []);

    const GenerateCaptcha = () => {
        const captchaText = Math.floor(100000 + Math.random() * 900000).toString();
        setCaptcha(captchaText);



    };


    const refreshCaptchaCode = () => {
        GenerateCaptcha();
    }

    return (
        <div className="contact-page">

            <header>
                <div className="header">
                    <div className="logo">
                        <img src={logoPath} alt="Logo" />
                    </div>
                </div>
                <div className="nav">
                    <ul>
                        <li><Link to="#">About Us</Link></li> |
                        <li><Link to="#">MGM</Link></li> |
                        <li><Link to="#">Tutorials</Link></li> |
                        <li><Link to="#">FAQ's</Link></li> |
                        <li><Link to="#">Downloads</Link></li> |
                        <li><Link to="/Contact">Contact Us</Link></li> |
                        <li><Link to="/">Home</Link></li>
                    </ul>
                </div>
                <div class="nav2">
                </div>
            </header>

            <div className="contact-form ">
                <h3 style={{ alignSelf: "center", textAlign: "center", paddingRight: "300px", color: "green" }}>Contact Us</h3>
                {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}
                {errorMessage && <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>}

                <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center" }}>
                    <table>
                        <tbody>

                            <tr>
                                <td>
                                    <input
                                        type="radio"
                                        name="enquiryType"
                                        value="C"
                                        checked={formData.enquiryType === "C"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="complaint">Complaint</label>
                                </td>
                                <td>
                                    <input
                                        type="radio"
                                        name="enquiryType"
                                        value="B"
                                        checked={formData.enquiryType === "B"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="business">Distributor / Business Enquiry</label>
                                </td>
                            </tr>


                            <tr>
                                <td colSpan={2} style={{ paddingLeft: "5px" }}>
                                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: 4 }}>
                                        {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                                        {errors.mobile && <span className="error-text">{errors.mobile}</span>}
                                        {errors.email && <span className="error-text">{errors.email}</span>}
                                        {errors.complaintDetails && <span className="error-text">{errors.complaintDetails}</span>}

                                        {errors.captcha && <span className="error-text">{errors.captcha}</span>}

                                    </div>

                                </td>
                            </tr>

                            <tr>
                                <td><label htmlFor="fullName">Full Name:</label></td>
                                <td>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className={errors.fullName ? 'error' : ''}
                                        style={{ width: "250px", height: "18px" }}
                                    />
                                    {errors.fullName && <span className="error-text">*</span>}
                                </td>
                            </tr>

                            <tr>
                                <td><label htmlFor="mobile">Mobile No.:</label></td>
                                <td>
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        maxLength="10"
                                        className={errors.mobile ? 'error' : ''}
                                        style={{ width: "250px", height: "18px" }}
                                    />
                                    {errors.mobile && <span className="error-text">*</span>}
                                </td>
                            </tr>

                            <tr>
                                <td><label htmlFor="email">Email ID:</label></td>
                                <td>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={errors.email ? 'error' : ''}
                                        style={{ width: "250px", height: "18px" }}
                                    />
                                    {errors.email && <span className="error-text">*</span>}
                                </td>
                            </tr>

                            <tr>
                                <td><label htmlFor="complaintDetails">Business Enquiry:</label></td>
                                <td>
                                    <textarea
                                        name="complaintDetails"
                                        value={formData.complaintDetails}
                                        onChange={handleChange}
                                        className={errors.complaintDetails ? 'error' : ''}
                                        style={{ width: "250px", height: "50px" }}
                                    />
                                    {errors.complaintDetails && <span className="error-text">*</span>}
                                </td>

                            </tr>

                            <tr>
                                <td><label htmlFor="captcha">Enter Below Code:</label></td>
                                <td style={{ paddingLeft: "6px" }}>
                                    <input
                                        type="text"
                                        name="captcha"
                                        value={formData.captcha}
                                        onChange={handleChange}
                                        className={errors.captcha ? 'error' : ''}
                                        style={{ width: "250px" }}
                                    />
                                    {errors.captcha && <span className="error-text">*</span>}
                                </td>
                            </tr>

                            <tr>

                                <td >&nbsp;</td>
                                <td >
                                    <div className="captcha" style={{ display: "flex", justifyContent: "start", flexDirection: "row", gap: 2 }}>


                                        <div style={{ border: "2px", borderStyle: "solid", borderColor: "#e9898d", paddingLeft: "8px", paddingRight: "2px", paddingTop: "2px", fontSize: "16px", width: "100px", height: "28px", background: "#fbffff", color: "#548864", fontStyle: "italic" }}>
                                            {captcha}
                                        </div>


                                        <div className="captcha-refresh" style={{ cursor: "pointer", display: "inline-block" }} onClick={refreshCaptchaCode}>
                                            <img src={refreshPath} alt="Refresh Captcha" style={{ width: "30px", height: "30px" }} />
                                        </div>

                                    </div>



                                </td>
                            </tr>

                            <tr>
                                <td colSpan="3" align="center">
                                    <input type="submit" value="Send Enquiry" className='' style={{ width: "100px", fontSize: "11px", color: "#666666" }} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
};

export default Contact;
