import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import AdminLayout from "./layouts/AdminLayout";
import SuperDistributorLayout from "./layouts/SuperDistributorLayout";
import DistributorLayout from "./layouts/DistributorLayout";
import RetailerLayout from "./layouts/RetailerLayout";
import PlayerLayout from "./layouts/PlayerLayout";

import Login from './pages/Login';
import roleBasedRoutes from "./routesConfig";

import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

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
      <Route path="*" element={<Navigate to={`/${role}/reports/pointtransfer`} replace />} />
    </Route>
  );
};

// 🔹 Main App Router
export default function Apclsp() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔹 Default redirect to login */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="auth/*" element={<AuthLayout />} >
          <Route path="login" element={<Login />} />
          {/* <Route path="signup" element={<Signup />} /> */}
        </Route>

        {/* Protected Role-Based Routes */}
        {renderRoleRoutes("superadmin", SuperAdminLayout)}
        {renderRoleRoutes("admin", AdminLayout)}
        {renderRoleRoutes("superareamanager", SuperDistributorLayout)}
        {renderRoleRoutes("areamanager", DistributorLayout)}
        {renderRoleRoutes("master", RetailerLayout)}
        {renderRoleRoutes("player", PlayerLayout)}

        {/* Redirect Unknown Paths */}
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </BrowserRouter >
  );
}