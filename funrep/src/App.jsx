import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import AdminLayout from "./layouts/AdminLayout";
import SuperDistributorLayout from "./layouts/SuperDistributorLayout";
import DistributorLayout from "./layouts/DistributorLayout";
import RetailerLayout from "./layouts/RetailerLayout";

import Home from './pages/Home';
import roleBasedRoutes from "./routesConfig";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PlayerLayout from "./layouts/PlayerLayout";
import OtcLayout from "./layouts/OtcLayout";
import GiftLayout from "./layouts/GiftLayout";
import LoanLayout from "./layouts/LoanLayout";

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


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />}>
          <Route path="login" element={<Home />} />
        </Route>

        {/* Protected Role-Based Routes */}
        {renderRoleRoutes("superadmin", SuperAdminLayout)}
        {renderRoleRoutes("admin", AdminLayout)}
        {renderRoleRoutes("superareamanager", SuperDistributorLayout)}
        {renderRoleRoutes("areamanager", DistributorLayout)}
        {renderRoleRoutes("master", RetailerLayout)}
        {renderRoleRoutes("player", PlayerLayout)}
        {renderRoleRoutes("otc", OtcLayout)}
        {renderRoleRoutes("gift", GiftLayout)}
        {renderRoleRoutes("loan", LoanLayout)}

        {/* Redirect from root to login */}

        {/* Redirect Unknown Paths */}
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
