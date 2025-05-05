import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/LayoutComponets/Header';
import Footer from '../components/LayoutComponets/Footer';

const PlayerLayout = () => {
  const { userData } = useSelector((state) => state.app);

  const navLinks = [
    { path: "/player/dashboard", label: "Manage My Points" },
    { path: "/player/childregistration", label: "Child Registration" },
    { path: "/player/changepassword", label: "Change Password" },
    { path: "/player/changepin", label: "PIN" },
    { path: "/player/updateprofile", label: "Update Profile" },
    { path: "/player/drawdetails", label: "Draw Details", bold: true },
    { path: "#", label: "Download Patch" },
    { path: "#", label: "Play Games" },
    { path: "/player/resetpinpassword", label: "Pin & Password" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header navLinks={navLinks} data={userData} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default PlayerLayout
