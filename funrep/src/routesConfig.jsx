import Contact from './pages/Contact';
import PointTransfer from './pages/PointTransfer';
import ResetPinPassword from './pages/ResetPinPassword';
import ChangePin from './pages/ChangePin';
import ChangePassword from './pages/ChangePassword';
import Dashboard from './pages/Dashboard';
import UpdateProfile from './pages/UpdateProfile';
import ChildRegistration from './pages/ChildRegistration';
import MemType from './pages/MemType';
import DrawDetails from './pages/DrawDetails';



// Role-Based Routes
const roleBasedRoutes = {
    superadmin: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "contact", element: <Contact /> },
        { path: "pointtransfer", element: <PointTransfer /> },
        { path: "changepassword", element: <ChangePassword /> },
        { path: "drawdetails", element: <DrawDetails /> },
        { path: "childregistration", element: <ChildRegistration /> },
        { path: "updateprofile", element: <UpdateProfile /> },
        { path: "changepin", element: <ChangePin /> },
        { path: "resetpinpassword", element: <ResetPinPassword /> },
        { path: "memtype", element: <MemType /> },
    ],
    admin: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "contact", element: <Contact /> },
        { path: "pointtransfer", element: <PointTransfer /> },
        { path: "changepassword", element: <ChangePassword /> },
        { path: "drawdetails", element: <DrawDetails /> },
        { path: "childregistration", element: <ChildRegistration /> },
        { path: "updateprofile", element: <UpdateProfile /> },
        { path: "changepin", element: <ChangePin /> },
        { path: "resetpinpassword", element: <ResetPinPassword /> },
        { path: "memtype", element: <MemType /> },
    ],
    superareamanager: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "contact", element: <Contact /> },
        { path: "pointtransfer", element: <PointTransfer /> },
        { path: "changepassword", element: <ChangePassword /> },
        { path: "drawdetails", element: <DrawDetails /> },
        { path: "childregistration", element: <ChildRegistration /> },
        { path: "updateprofile", element: <UpdateProfile /> },
        { path: "changepin", element: <ChangePin /> },
        { path: "resetpinpassword", element: <ResetPinPassword /> },
        { path: "memtype", element: <MemType /> },
    ],
    areamanager: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "contact", element: <Contact /> },
        { path: "pointtransfer", element: <PointTransfer /> },
        { path: "changepassword", element: <ChangePassword /> },
        { path: "drawdetails", element: <DrawDetails /> },
        { path: "childregistration", element: <ChildRegistration /> },
        { path: "updateprofile", element: <UpdateProfile /> },
        { path: "changepin", element: <ChangePin /> },
        { path: "resetpinpassword", element: <ResetPinPassword /> },
        { path: "memtype", element: <MemType /> },
    ],
    master: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "contact", element: <Contact /> },
        { path: "pointtransfer", element: <PointTransfer /> },
        { path: "changepassword", element: <ChangePassword /> },
        { path: "drawdetails", element: <DrawDetails /> },
        { path: "childregistration", element: <ChildRegistration /> },
        { path: "updateprofile", element: <UpdateProfile /> },
        { path: "changepin", element: <ChangePin /> },
        { path: "resetpinpassword", element: <ResetPinPassword /> },
        { path: "memtype", element: <MemType /> },
    ],
    player: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "contact", element: <Contact /> },
        { path: "pointtransfer", element: <PointTransfer /> },
        { path: "changepassword", element: <ChangePassword /> },
        { path: "drawdetails", element: <DrawDetails /> },
        { path: "childregistration", element: <ChildRegistration /> },
        { path: "updateprofile", element: <UpdateProfile /> },
        { path: "changepin", element: <ChangePin /> },
        { path: "resetpinpassword", element: <ResetPinPassword /> },
        { path: "memtype", element: <MemType /> },
    ],
    gift: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "contact", element: <Contact /> },
        { path: "pointtransfer", element: <PointTransfer /> },
        { path: "changepassword", element: <ChangePassword /> },
        { path: "drawdetails", element: <DrawDetails /> },
        { path: "childregistration", element: <ChildRegistration /> },
        { path: "updateprofile", element: <UpdateProfile /> },
        { path: "changepin", element: <ChangePin /> },
        { path: "resetpinpassword", element: <ResetPinPassword /> },
        { path: "memtype", element: <MemType /> },
    ],

    otc: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "contact", element: <Contact /> },
        { path: "pointtransfer", element: <PointTransfer /> },
        { path: "changepassword", element: <ChangePassword /> },
        { path: "drawdetails", element: <DrawDetails /> },
        { path: "childregistration", element: <ChildRegistration /> },
        { path: "updateprofile", element: <UpdateProfile /> },
        { path: "changepin", element: <ChangePin /> },
        { path: "resetpinpassword", element: <ResetPinPassword /> },
        { path: "memtype", element: <MemType /> },
    ],
    loan: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "contact", element: <Contact /> },
        { path: "pointtransfer", element: <PointTransfer /> },
        { path: "changepassword", element: <ChangePassword /> },
        { path: "drawdetails", element: <DrawDetails /> },
        { path: "childregistration", element: <ChildRegistration /> },
        { path: "updateprofile", element: <UpdateProfile /> },
        { path: "changepin", element: <ChangePin /> },
        { path: "resetpinpassword", element: <ResetPinPassword /> },
        { path: "memtype", element: <MemType /> },
    ],
};

export default roleBasedRoutes;