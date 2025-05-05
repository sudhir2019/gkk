import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import AdminLayout from "./layouts/AdminLayout";
import SuperDistributorLayout from "./layouts/SuperDistributorLayout";
import DistributorLayout from "./layouts/DistributorLayout";
import RetailerLayout from "./layouts/RetailerLayout";

import ToastContainers from "./components/Toast/ToastContainer";

import roleBasedRoutes from "./routesConfig"; // Make sure this is defined properly with route paths for each role

import Home from "./pages/HomePages/Home";
import Login from "./pages/AuthenticationPages/Login";
import Signup from "./pages/AuthenticationPages/Signup";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";


// 🔹 Function to Render Role-Based Routes
const renderRoleRoutes = (role, Layout) => {
    if (!role || !roleBasedRoutes[role]) {
        console.error(`No routes found for role: ${role}`);
        return null;
    }
    return (
        <Route path={`${role}/*`} element={<ProtectedRoute element={Layout} requiredRoles={[role]} />}>
            {roleBasedRoutes[role].map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
            ))}
            {/* Redirect to Dashboard if an unknown path is accessed */}
            <Route path="*" element={<Navigate to={`/${role}/dashboard`} replace />} />
        </Route>
    );
};

// 🔹 Main App Router
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                </Route>

                <Route path="auth/*" element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Route>

                {/* Protected Role-Based Routes */}
                {renderRoleRoutes("superadmin", SuperAdminLayout)}
                {renderRoleRoutes("admin", AdminLayout)}
                {renderRoleRoutes("superareamanager", SuperDistributorLayout)}
                {renderRoleRoutes("areamanager", DistributorLayout)}
                {renderRoleRoutes("master", RetailerLayout)}

                {/* Redirect Unknown Paths */}
                <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </Routes>

            <ToastContainers />
        </BrowserRouter>
    );
}