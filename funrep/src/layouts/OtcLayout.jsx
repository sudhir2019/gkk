import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/LayoutComponets/Header';
import Footer from '../components/LayoutComponets/Footer';

const OtcLayout = () => {
  const { userData } = useSelector((state) => state.app);

  const navLinks = [
    { path: "/otc/dashboard", label: "Manage My Points" },
    { path: "/otc/childregistration", label: "Child Registration" },
    { path: "/otc/changepassword", label: "Change Password" },
    { path: "/otc/changepin", label: "PIN" },
    { path: "/otc/updateprofile", label: "Update Profile" },
    { path: "/otc/drawdetails", label: "Draw Details", bold: true },
    { path: "#", label: "Download Patch" },
    { path: "#", label: "Play Games" },
    { path: "/otc/resetpinpassword", label: "Pin & Password" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header navLinks={navLinks} data={userData} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default OtcLayout
