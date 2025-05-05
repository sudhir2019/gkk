import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { useSelector } from "react-redux";
import { Outlet } from 'react-router-dom';

import Footer from '../components/layoutsComponents/Footer/Footer';
import Navbar from '../components/layoutsComponents/Navbar/Navbar';
import Sidebar from '../components/layoutsComponents/Sidebar/Sidebar';



import Loader from '../components/LoaderComponents/Loader';


function SuperDistributorLayout() {
    const { isLoadingSession, authUser } = useSelector((state) => state.auth);
    const menuItems = [
        { category: "Main", links: [{ to: "/superareamanager/dashboard", icon: "box", label: "Dashboard" }] },
        {
            category: "Management",
            links: [
                { to: "/superareamanager/areamanager", icon: "users", label: "Area Manager" },
                { to: "/superareamanager/master", icon: "users", label: "Master" },
                { to: "/superareamanager/player", icon: "users", label: "Player" },
                { to: "/superareamanager/onlineplayers", icon: "log-in", label: "Online Players" },
            ],
        },
        {
            category: "Game",
            links: [
                { to: "/superareamanager/gamehistory", icon: "inbox", label: "Game History" },
            ],
        },
        {
            category: "Reports",
            links: [
                { to: "/superareamanager/turnoverreport", icon: "inbox", label: "TurnOver Report" },
                { to: "/superareamanager/transactionreport", icon: "briefcase", label: "Transaction Report" },
                { to: "/superareamanager/commissionpayoutReport", icon: "briefcase", label: "Commission Payout Report" },
                { to: "/superareamanager/admincommissionreport", icon: "briefcase", label: "Admin Commission Report" },
            ],
        },
        {
            category: "Live Reports",
            links: [
                {
                    to: "#", icon: "download", label: "Live Result", submenu: [
                        { href: "/superareamanager/liveResult/LiveResult12one", label: "Lucky 12 one" },
                        { href: "/superareamanager/liveResult/LiveResult12two", label: "Lucky 12 two" },
                        { href: "/superareamanager/liveResult/LiveResult12three", label: "Lucky 12 coupon" },
                        { href: "/superareamanager/liveResult/LiveResult16", label: "Lucky 16" },
                        { href: "/superareamanager/liveResult/LiveResultTripleChanse", label: "Triple Chance" },
                        { href: "/superareamanager/liveResult/LiveResultRoulette", label: "GK Roulette-36" },
                    ]
                },
            ],
        },
        { category: "Logs Activity", links: [{ to: "/superareamanager/logactivities", icon: "inbox", label: "Logs" }] },
    ];
    // Combine both loading states (session and users loading)
    return (
        <div className="main-wrapper h-screen" id="app">
            <Sidebar menuItems={menuItems} />
            <div className="page-wrapper">
                <Navbar user={authUser} profileLink={"/superareamanager/profile"} />
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

export default SuperDistributorLayout;