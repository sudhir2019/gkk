import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";

import Footer from '../components/layoutsComponents/Footer/Footer';
import Sidebar from '../components/layoutsComponents/Sidebar/Sidebar';
import Navbar from '../components/layoutsComponents/Navbar/Navbar';


import Loader from '../components/LoaderComponents/Loader';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import useGamepercentageByAdmin from '../hooks/admin/percentage/useGamepercentageByAdmin';

function SuperAdminLayout() {
    const { isLoadingSession, authUser } = useSelector((state) => state.auth);
    const { percentagelist } = useGamepercentageByAdmin();

    // console.log(percentagelist);

    const submenu = () => {
        return percentagelist && percentagelist.map((obj, inx) => {
            return {
                href: `/${authUser.role}/game/${obj.gameId}/${obj.id}/${obj.username}`,
                label: obj.gameName + "\n" + obj.username
            };
        });
    };

    const menuItems = [
        { category: "Main", links: [{ to: "/superadmin/dashboard", icon: "box", label: "Dashboard" }] },
        {
            category: "Management",
            links: [
                { to: "/superadmin/timemaster", icon: "users", label: "Time Master" },
                { to: "/superadmin/gamemaster", icon: "users", label: "Games Master" },
                { to: "/superadmin/admin", icon: "users", label: "Admin" },
                { to: "/superadmin/superareamanager", icon: "users", label: "Super Area manager" },
                { to: "/superadmin/areamanager", icon: "users", label: "Area Manager" },
                { to: "/superadmin/master", icon: "users", label: "Master" },
                { to: "/superadmin/player", icon: "users", label: "Player" },
                { to: "/superadmin/gift", icon: "users", label: "Gift" },
                { to: "/superadmin/loan", icon: "users", label: "Loan" },
                { to: "/superadmin/otc", icon: "users", label: "OTC" },
                { to: "/superadmin/onlineplayers", icon: "log-in", label: "Online Players" },
            ],
        },
        {
            category: "Game",
            links: [
                { to: "/superadmin/gamehistory", icon: "inbox", label: "Game History" },
                ...(authUser.role === "superadmin" || authUser.role === "admin"
                    ? [{ to: "/superadmin/winpercentage", icon: "inbox", label: "Win Percentage" }]
                    : []),
            ],
        },
        {
            category: "Reports",
            links: [
                { to: "/superadmin/turnoverreport", icon: "inbox", label: "TurnOver Report" },
                { to: "/superadmin/transactionreport", icon: "briefcase", label: "Transaction Report" },
                { to: "/superadmin/commissionpayoutReport", icon: "briefcase", label: "Commission Payout Report" },
                { to: "/superadmin/admincommissionreport", icon: "briefcase", label: "Admin Commission Report" },
            ],
        },
        {
            category: "Live Reports",
            links: [
                {
                    to: "#", icon: "download", label: "Live Result", submenu: submenu()
                },
            ],
        },
        { category: "Logs Activity", links: [{ to: "/superadmin/logactivities", icon: "inbox", label: "Logs" }] },
        { category: "Contact us", links: [{ to: "/superadmin/contactus", icon: "inbox", label: "Contact Us" }] },
    ];
    return (
        <div className="main-wrapper h-screen" id="app">
            <Sidebar menuItems={menuItems} />
            <div className="page-wrapper">
                <Navbar user={authUser} profileLink={"/superadmin/profile"} company={""} />
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