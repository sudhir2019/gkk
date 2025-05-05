import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../stores/actions/authActions";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function useLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [locationError, setLocationError] = useState("");
    const [isLocationAvailable, setIsLocationAvailable] = useState(false);
    const [showLocationPopup, setShowLocationPopup] = useState(false);
    const [captcha, setCaptcha] = useState("");
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [accuracy, setAccuracy] = useState('');

    const { isLoading } = useSelector((state) => state.auth);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onBlur" });

    // Generate a random captcha
    const generateCaptcha = () => {
        const length = 6;
        const max = Math.pow(10, length) - 1; // 999999
        const min = Math.pow(10, length - 1); // 100000
        const captcha = Math.floor(Math.random() * (max - min + 1)) + min;
        setCaptcha(captcha.toString());
    };

    // Geolocation check
    const checkLocationPermission = () => {
        if (!navigator.geolocation) {
            console.warn("Geolocation not supported by browser.");
            setLocationError("Your browser does not support geolocation.");
            setIsLocationAvailable(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Location received:", position.coords);
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setAccuracy(position.coords.accuracy);
                setIsLocationAvailable(true);
                setLocationError("");
                setShowLocationPopup(false); // Hide popup if location is available
            },
            (error) => {
                console.error("Geolocation error:", error);

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setLocationError("⚠️ Location access is blocked. Please enable it in browser settings.");
                        setShowLocationPopup(true); // Show popup for manual enabling
                        break;
                    case error.POSITION_UNAVAILABLE:
                        setLocationError("❌ Location is unavailable. Please check your GPS or internet connection.");
                        break;
                    case error.TIMEOUT:
                        setLocationError("⏳ Location request timed out. Please try again.");
                        break;
                    default:
                        setLocationError("❗ Unknown error occurred while fetching location.");
                        break;
                }

                setIsLocationAvailable(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };


    useEffect(() => {
        generateCaptcha();
        checkLocationPermission();
    }, []);


    // Prepare API payload
    const preparePayload = (data) => ({
        username: data.userName.trim(),
        password: data.userPassword,
    });

    // Handle form submission
    const onSubmit = async (data) => {
        setServerError("");
        setSuccessMessage("");
        const payload = preparePayload(data);
        try {
            if (data.captchaInput !== captcha) {
                throw new Error("Captcha verification failed.");
            }
            if (!data.userName || !data.userPassword) {
                throw new Error("Username and password are required.");
            }
            const response = await dispatch(loginAsync(payload)).unwrap();
            setSuccessMessage("Login successful!");
            reset();

            setTimeout(() => {
                const rolePathMap = {
                    superadmin: "/superadmin/reports/pointtransfer",
                    admin: "/admin/reports/pointtransfer",
                    superareamanager: "/superareamanager/reports/pointtransfer",
                    areamanager: "/areamanager/reports/pointtransfer",
                    master: "/master/reports/pointtransfer",
                    player: "/player/reports/pointtransfer",
                };

                if (!response || !response.roles) {
                    console.error("Roles data is missing or invalid:", response?.roles);
                    navigate("/auth/login");
                    return;
                }

                // Navigate based on role
                const userRole = response.roles.toLowerCase();
                navigate(rolePathMap[userRole] || "/auth/login");
            }, 1000);

        } catch (error) {
            setServerError(error.message || "An error occurred during login.");
        }
    };

    // Reset server error after 1 second
    useEffect(() => {
        const errorTimeout = setTimeout(() => setServerError(""), 1000);
        return () => clearTimeout(errorTimeout);
    }, []);

    return {
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
    };
}
