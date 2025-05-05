import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/LayoutComponets/Header';
import Footer from '../components/LayoutComponets/Footer';

const SuperDistributorLayout = () => {
    const { userData } = useSelector((state) => state.app);

    const navLinks = [
        { path: "/superareamanager/dashboard", label: "Manage My Points" },
        { path: "/superareamanager/childregistration", label: "Child Registration" },
        { path: "/superareamanager/changepassword", label: "Change Password" },
        { path: "/superareamanager/changepin", label: "PIN" },
        { path: "/superareamanager/updateprofile", label: "Update Profile" },
        { path: "/superareamanager/drawdetails", label: "Draw Details", bold: true },
        { path: "#", label: "Download Patch" },
        { path: "#", label: "Play Games" },
        { path: "/superareamanager/resetpinpassword", label: "Pin & Password" },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Header navLinks={navLinks} data={userData} />
            <Outlet />
            <Footer />
        </div>
    );
}

export default SuperDistributorLayout
