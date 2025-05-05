import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/LayoutComponets/Header';
import Footer from '../components/LayoutComponets/Footer';

const LoanLayout = () => {
  const { userData } = useSelector((state) => state.app);

  const navLinks = [
    { path: "/loan/dashboard", label: "Manage My Points" },
    { path: "/loan/childregistration", label: "Child Registration" },
    { path: "/loan/changepassword", label: "Change Password" },
    { path: "/loan/changepin", label: "PIN" },
    { path: "/loan/updateprofile", label: "Update Profile" },
    { path: "/loan/drawdetails", label: "Draw Details", bold: true },
    { path: "#", label: "Download Patch" },
    { path: "#", label: "Play Games" },
    { path: "/loan/resetpinpassword", label: "Pin & Password" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header navLinks={navLinks} data={userData} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default LoanLayout
