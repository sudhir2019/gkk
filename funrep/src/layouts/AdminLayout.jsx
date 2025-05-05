import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/LayoutComponets/Header';
import Footer from '../components/LayoutComponets/Footer';


const AdminLayout = () => {
    const { userData } = useSelector((state) => state.app);

    const navLinks = [
        { path: "/admin/dashboard", label: "Manage My Points" },
        { path: "/admin/childregistration", label: "Child Registration" },
        { path: "/admin/changepassword", label: "Change Password" },
        { path: "/admin/changepin", label: "PIN" },
        { path: "/admin/updateprofile", label: "Update Profile" },
        { path: "/admin/drawdetails", label: "Draw Details", bold: true },
        { path: "#", label: "Download Patch" },
        { path: "#", label: "Play Games" },
        { path: "/admin/resetpinpassword", label: "Pin & Password" },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Header navLinks={navLinks} data={userData} />
            <Outlet />
            <Footer />
        </div>
    );
};

export default AdminLayout;
