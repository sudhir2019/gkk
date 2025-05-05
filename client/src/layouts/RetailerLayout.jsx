import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { useSelector } from "react-redux";
import { Outlet } from 'react-router-dom';

import Footer from '../components/layoutsComponents/Footer/Footer';
import Navbar from '../components/layoutsComponents/Navbar/Navbar';
import Sidebar from '../components/layoutsComponents/Sidebar/Sidebar';



import Loader from '../components/LoaderComponents/Loader';

function SuperAdminLayout() {
    const { isLoadingSession, authUser } = useSelector((state) => state.auth);
    const menuItems = [
        { category: "Main", links: [{ to: "/master/dashboard", icon: "box", label: "Dashboard" }] },
        {
            category: "Management",
            links: [
                { to: "/master/player", icon: "users", label: "Player" },
                { to: "/master/onlineplayers", icon: "log-in", label: "Online Players" },
            ],
        },
        {
            category: "Game",
            links: [
                { to: "/master/gamehistory", icon: "inbox", label: "Game History" },
            ],
        },
        {
            category: "Reports",
            links: [
                { to: "/master/turnoverreport", icon: "inbox", label: "TurnOver Report" },
                { to: "/master/transactionreport", icon: "briefcase", label: "Transaction Report" },
                { to: "/master/commissionpayoutReport", icon: "briefcase", label: "Commission Payout Report" },
                { to: "/master/admincommissionreport", icon: "briefcase", label: "Admin Commission Report" },
            ],
        },
        {
            category: "Live Reports",
            links: [
                {
                    to: "#", icon: "download", label: "Live Result", submenu: [
                        { href: "/master/liveResult/LiveResult12one", label: "Lucky 12 one" },
                        { href: "/master/liveResult/LiveResult12two", label: "Lucky 12 two" },
                        { href: "/master/liveResult/LiveResult12three", label: "Lucky 12 coupon" },
                        { href: "/master/liveResult/LiveResult16", label: "Lucky 16" },
                        { href: "/master/liveResult/LiveResultTripleChanse", label: "Triple Chance" },
                        { href: "/master/liveResult/LiveResultRoulette", label: "GK Roulette-36" },
                    ]
                },
            ],
        },
        { category: "Logs Activity", links: [{ to: "/master/logactivities", icon: "inbox", label: "Logs" }] },
    ];
    return (
        <div className="main-wrapper h-screen" id="app">
            <Sidebar menuItems={menuItems} />
            <div className="page-wrapper">
                <Navbar user={authUser} profileLink={"/master/profile"} />
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

export default SuperAdminLayout;