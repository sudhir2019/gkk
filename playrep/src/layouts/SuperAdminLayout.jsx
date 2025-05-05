import { Outlet } from "react-router-dom";
import Navbar from "../components/layoutsComponents/Navbar";
import Footer from "../components/layoutsComponents/Footer";
import { useSelector } from "react-redux";

function SuperAdminLayout() {
    const { authUser } = useSelector((state) => state.auth);
    const menuItems = [
        {
            navLink: [{ to: "/superadmin/reports/pointtransfer", label: "Reports" }],
            links: [
                { to: "/superadmin/reports/revenue", label: "Revenue" },
                { to: "/superadmin/reports/pokerrevenue", label: "Poker Revenue" },
                { to: "/superadmin/reports/pointtransfer", label: "Point Transfer" },
                { to: "/superadmin/reports/multipointtransfer", label: "Multiplayer Point Transfer" },
                { to: "/superadmin/reports/dailystatus", label: "Daily Status" },
                { to: "/superadmin/reports/agentdetails", label: "Agent Details" },
                { to: "/superadmin/reports/revenuerecovery", label: "Revenue Recovery" },
                { to: "/superadmin/reports/computerloan", label: "Computer Loan" },
                { to: "/superadmin/reports/multiplecybers", label: "Multiple Cybers" },
                { to: "/superadmin/reports/nonperfomeragent", label: "Non Performer Agent" },
                { to: "/superadmin/reports/agenstatus", label: "Agent Status" },
                { to: "/superadmin/reports/balancereport", label: "Balance Report" },

            ],
        },
        {
            navLink: [{ to: "/superadmin/drawdetails/funtarget/MNOQqWWi", label: "Draw Details" }],
            links: [
                { to: "/superadmin/drawdetails/funtarget/MNOQqWWi", label: "Fun Target" },
                { to: "/superadmin/drawdetails/funroullet/vwRORrGO", label: "Fun Roullet" },
                { to: "/superadmin/drawdetails/triplefun/zuuhVbBM", label: "Triple Fun" },
                { to: "/superadmin/drawdetails/funab/qZicXikM", label: "Fun AB" },
            ],
        },
        {
            navLink: [{ to: "/superadmin/mailreports/managermaildetails", label: "Mail Report" }],
            links: [
                { to: "/superadmin/mailreports/agentmaildetails ", label: "Agent Mail Details" },
            ],
        },
        {
            navLink: [{ to: "/superadmin/weeklydetailsreport", label: "Weekly Details Reports" }],
        }
    ];

    return (
        <div className="gridContainer clearfix">
            <div id="LayoutDiv1">
                <Navbar menuItems={menuItems} user={authUser} />
                <Outlet />
                <Footer />
            </div>
        </div>
    );
}

export default SuperAdminLayout;
