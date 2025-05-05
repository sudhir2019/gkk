import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/LayoutComponets/Header';
import Footer from '../components/LayoutComponets/Footer';

const RetailerLayout = () => {
    const { userData } = useSelector((state) => state.app);

    const navLinks = [
        { path: "/master/dashboard", label: "Manage My Points" },
        { path: "/master/childregistration", label: "Child Registration" },
        { path: "/master/changepassword", label: "Change Password" },
        { path: "/master/changepin", label: "PIN" },
        { path: "/master/updateprofile", label: "Update Profile" },
        { path: "/master/drawdetails", label: "Draw Details", bold: true },
        { path: "#", label: "Download Patch" },
        { path: "#", label: "Play Games" },
        { path: "/master/resetpinpassword", label: "Pin & Password" },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Header navLinks={navLinks} data={userData} />
            <Outlet />
            <Footer />
        </div>
    )
}

export default RetailerLayout
