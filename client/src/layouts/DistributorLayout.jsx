import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";

import Footer from '../components/layoutsComponents/Footer/Footer';
import Sidebar from '../components/layoutsComponents/Sidebar/Sidebar';
import Navbar from '../components/layoutsComponents/Navbar/Navbar';



import Loader from '../components/LoaderComponents/Loader';

function DistributorLayout() {
    const { isLoadingSession, authUser } = useSelector((state) => state.auth);
    const menuItems = [
        { category: "Main", links: [{ to: "/areamanager/dashboard", icon: "box", label: "Dashboard" }] },
        {
            category: "Management",
            links: [
                { to: "/areamanager/master", icon: "users", label: "Master" },
                { to: "/areamanager/player", icon: "users", label: "Player" },
                { to: "/areamanager/onlineplayers", icon: "log-in", label: "Online Players" },
            ],
        },
        {
            category: "Game",
            links: [
                { to: "/areamanager/gamehistory", icon: "inbox", label: "Game History" },
            ],
        },
        {
            category: "Reports",
            links: [
                { to: "/areamanager/turnoverreport", icon: "inbox", label: "TurnOver Report" },
                { to: "/areamanager/transactionreport", icon: "briefcase", label: "Transaction Report" },
                { to: "/areamanager/commissionpayoutReport", icon: "briefcase", label: "Commission Payout Report" },
                { to: "/areamanager/admincommissionreport", icon: "briefcase", label: "Admin Commission Report" },
            ],
        },
        {
            category: "Live Reports",
            links: [
                {
                    to: "#", icon: "download", label: "Live Result", submenu: [
                        { href: "/areamanager/liveResult/LiveResult12one", label: "Lucky 12 one" },
                        { href: "/areamanager/liveResult/LiveResult12two", label: "Lucky 12 two" },
                        { href: "/areamanager/liveResult/LiveResult12three", label: "Lucky 12 coupon" },
                        { href: "/areamanager/liveResult/LiveResult16", label: "Lucky 16" },
                        { href: "/areamanager/liveResult/LiveResultTripleChanse", label: "Triple Chance" },
                        { href: "/areamanager/liveResult/LiveResultRoulette", label: "GK Roulette-36" },
                    ]
                },
            ],
        },
        { category: "Logs Activity", links: [{ to: "/areamanager/logactivities", icon: "inbox", label: "Logs" }] },
    ];
    return (
        <div className="main-wrapper h-screen" id="app">
            <Sidebar menuItems={menuItems} />
            <div className="page-wrapper">
                <Navbar user={authUser} profileLink={"/areamanager/profile"} />
                <div className="page-content overflow-auto">
                    {isLoadingSession ? (
                        <div className="flex justify-center items-center h-full">
                            <Loader />
                        </div>
                    ) : (
                        <Outlet />
                    )}
                 
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default DistributorLayout;