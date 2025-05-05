import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element: Layout, requiredRoles }) => {
    const { authUser } = useSelector(state => state.auth);
    // const token = sessionStorage.getItem("authToken");
    const tokenExpiration = sessionStorage.getItem("tokenExpiryTime");
    const currentTime = new Date().getTime();
    const redirectTo = "/auth/login";
    // Redirect if no token or token expired
    if (!tokenExpiration || currentTime > tokenExpiration) {
        sessionStorage.clear();
        return <Navigate to={redirectTo} replace />;
    }
    // Redirect if no user or invalid user data
    if (!authUser || Array.isArray(authUser)) {
        return <Navigate to={redirectTo} replace />;
    }
    // Redirect if user doesn't have required role
    if (requiredRoles.length > 0 && !requiredRoles.includes(authUser.role)) {
        return <Navigate to={`/${authUser.role}/dashboard`} replace />;
    }

    // Render the Layout with children
    return <Layout><Outlet /></Layout>;
};

export default ProtectedRoute;
