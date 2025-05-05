import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ element: Layout, requiredRoles }) => {
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
        return <Navigate to={`/${authUser.role}/reports`} replace />;
    }
    // Render the Layout with children
    return <Layout><Outlet /></Layout>;
};

// export const ProtectedAuthRoute = ({ element: Layout }) => {
//     const { authUser } = useSelector(state => state.auth);
//     const tokenExpiration = sessionStorage.getItem("tokenExpiryTime");
//     const currentTime = new Date().getTime();
//     if (tokenExpiration && authUser) {
//         return <Navigate to={`/${authUser.role}/reports`} replace />;
//     }
//     // Else → allow to access login/signup/etc.
//     return <Layout><Outlet /></Layout>;
// };
