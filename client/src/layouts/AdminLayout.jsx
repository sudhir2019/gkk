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

function AdminLayout() {
    const { isLoadingSession, authUser } = useSelector((state) => state.auth);
    const { percentagelist } = useGamepercentageByAdmin()
    const submenu = () => {
        return percentagelist && percentagelist.map((obj, inx) => {
            return {
                href: `/${authUser.role}/game/${obj.gameId}/${obj.adminId}/${obj.username}`,
                label: obj.gameName + "\n" + obj.username
            };
        });
    };

    const menuItems = [
        { category: "Main", links: [{ to: "/admin/dashboard", icon: "box", label: "Dashboard" }] },
        {
            category: "Management",
            links: [
                { to: "/admin/superareamanager", icon: "users", label: "Super Area Manager" },
                { to: "/admin/areamanager", icon: "users", label: "Area Manager" },
                { to: "/admin/master", icon: "users", label: "Master" },
                { to: "/admin/player", icon: "users", label: "Player" },
                { to: "/admin/gift", icon: "users", label: "Gift" },
                { to: "/admin/loan", icon: "users", label: "Loan" },
                { to: "/admin/otc", icon: "users", label: "OTC" },
                { to: "/admin/onlineplayers", icon: "log-in", label: "Online Players" },
            ],
        },
        {
            category: "Game",
            links: [
                { to: "/admin/gamehistory", icon: "inbox", label: "Game History" },
                { to: "/admin/winpercentage", icon: "inbox", label: "Win Percentage" },
            ],
        },
        {
            category: "Reports",
            links: [
                { to: "/admin/turnoverreport", icon: "inbox", label: "TurnOver Report" },
                { to: "/admin/transactionreport", icon: "briefcase", label: "Transaction Report" },
                { to: "/admin/commissionpayoutReport", icon: "briefcase", label: "Commission Payout Report" },
                { to: "/admin/admincommissionreport", icon: "briefcase", label: "Admin Commission Report" },
            ],
        },
        // {
        //     category: "Live Reports",
        //     links: [
        //         {
        //             to: "#", icon: "download", label: "Live Result", submenu: [
        //                 { href: "/admin/funtarget", icon: "inbox", label: "Fun Target" },
        //                 { href: "/admin/funroullet", icon: "inbox", label: "Fun Roullet" },
        //             ],
        //         },
        //     ],
        // },
    
        {
            category: "Live Reports",
            links: [
                {
                    to: "#", icon: "download", label: "Live Result", submenu: submenu(),
                },
            ],
        },
        { category: "Logs Activity", links: [{ to: "/admin/logactivities", icon: "inbox", label: "Logs" }] },
        { category: "Contact us", links: [{ to: "/admin/contactus", icon: "inbox", label: "Contact Us" }] },
    ];
    // Combine both loading states (session and users loading)
    return (
        <div className="main-wrapper h-screen" id="app">
            <Sidebar menuItems={menuItems} />
            <div className="page-wrapper">
                <Navbar user={authUser} profileLink={"/admin/profile"} />
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

export default AdminLayout;