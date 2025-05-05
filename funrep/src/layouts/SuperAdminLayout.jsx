import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/LayoutComponets/Header';
import Footer from '../components/LayoutComponets/Footer';

const SuperAdminLayout = () => {
    const { userData } = useSelector((state) => state.app);

    const navLinks = [
        { path: "/superadmin/dashboard", label: "Manage My Points" },
        { path: "/superadmin/childregistration", label: "Child Registration" },
        { path: "/superadmin/changepassword", label: "Change Password" },
        { path: "/superadmin/changepin", label: "PIN" },
        { path: "/superadmin/updateprofile", label: "Update Profile" },
        { path: "/superadmin/drawdetails", label: "Draw Details", bold: true },
        { path: "#", label: "Download Patch" },
        { path: "#", label: "Play Games" },
        { path: "/superadmin/resetpinpassword", label: "Pin & Password" },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Header navLinks={navLinks} data={userData} />
            <Outlet />
            <Footer />
        </div>
    )
}

export default SuperAdminLayout
