import { useDispatch } from "react-redux";
import { logoutAsync } from "../../stores/actions/authActions";
import { useNavigate } from "react-router-dom";
import { persistor } from "../../stores/store";

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            navigate("/auth/login");
            // Trigger the API logout and state reset
            await dispatch(logoutAsync()).unwrap();
            // navigate to login page after logout


            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('tokenExpiryTime');
            sessionStorage.removeItem('role');


            persistor.purge(); // This removes the persisted state from localStorage
            await persistor.flush();
            // Optionally redirect the user to the login page or homepage
            // window.location.href = '/auth/login'; // or use Navigate if you're using react-router



        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return handleLogout;
};

export default useLogout;
