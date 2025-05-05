import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/LayoutComponets/Header';
import Footer from '../components/LayoutComponets/Footer';

const DistributorLayout = () => {
    const { userData } = useSelector((state) => state.app);

    const navLinks = [
        { path: "/areamanager/dashboard", label: "Manage My Points" },
        { path: "/areamanager/childregistration", label: "Child Registration" },
        { path: "/areamanager/changepassword", label: "Change Password" },
        { path: "/areamanager/changepin", label: "PIN" },
        { path: "/areamanager/updateprofile", label: "Update Profile" },
        { path: "/areamanager/drawdetails", label: "Draw Details", bold: true },
        { path: "#", label: "Download Patch" },
        { path: "#", label: "Play Games" },
        { path: "/areamanager/resetpinpassword", label: "Pin & Password" },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Header navLinks={navLinks} data={userData} />
            <Outlet />
            <Footer />
        </div>
    )
}

export default DistributorLayout