import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/LayoutComponets/Header';
import Footer from '../components/LayoutComponets/Footer';

const GiftLayout = () => {
    const { userData } = useSelector((state) => state.app);

    const navLinks = [
        { path: "/gift/dashboard", label: "Manage My Points" },
        { path: "/gift/childregistration", label: "Child Registration" },
        { path: "/gift/changepassword", label: "Change Password" },
        { path: "/gift/changepin", label: "PIN" },
        { path: "/gift/updateprofile", label: "Update Profile" },
        { path: "/gift/drawdetails", label: "Draw Details", bold: true },
        { path: "#", label: "Download Patch" },
        { path: "#", label: "Play Games" },
        { path: "/gift/resetpinpassword", label: "Pin & Password" },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Header navLinks={navLinks} data={userData} />
            <Outlet />
            <Footer />
        </div>
    )
}

export default GiftLayout
