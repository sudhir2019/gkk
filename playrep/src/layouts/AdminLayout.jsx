import { Outlet } from "react-router-dom";
import Navbar from "../components/layoutsComponents/Navbar";
import Footer from "../components/layoutsComponents/Footer";
import { useSelector } from "react-redux";

function AdminLayout() {
    const { authUser } = useSelector((state) => state.auth);
    const menuItems = [
        {
            navLink: [{ to: "/admin/reports/pointtransfer", label: "Reports" }],
            links: [
                { to: "/admin/reports/revenue", label: "Revenue" },
                { to: "/admin/reports/pokerrevenue", label: "Poker Revenue" },
                { to: "/admin/reports/pointtransfer", label: "Point Transfer" },
                { to: "/admin/reports/multipointtransfer", label: "Multiplayer Point Transfer" },
                { to: "/admin/reports/dailystatus", label: "Daily Status" },
                { to: "/admin/reports/agentdetails", label: "Agent Details" },
                { to: "/admin/reports/revenuerecovery", label: "Revenue Recovery" },
                { to: "/admin/reports/computerloan", label: "Computer Loan" },
                { to: "/admin/reports/multiplecybers", label: "Multiple Cybers" },
                { to: "/admin/reports/nonperfomeragent", label: "Non Performer Agent" },
                { to: "/admin/reports/agenstatus", label: "Agent Status" },
                { to: "/admin/reports/balancereport", label: "Balance Report" },

            ],
        },
        {
            navLink: [{ to: "/admin/drawdetails/funtarget/MNOQqWWi", label: "Draw Details" }],
            links: [
                { to: "/admin/drawdetails/funtarget/MNOQqWWi", label: "Fun Target" },
                { to: "/admin/drawdetails/funroullet/vwRORrGO", label: "Fun Roullet" },
                { to: "/admin/drawdetails/triplefun/zuuhVbBM", label: "Triple Fun" },
                { to: "/admin/drawdetails/funab/qZicXikM", label: "Fun AB" },
            ],
        },
        {
            navLink: [{ to: "/admin/mailreports/managermaildetails", label: "Mail Report" }],
            links: [
                { to: "/admin/mailreports/managermaildetails ", label: "Manager Mail Details" },
            ],
        },
        {
            navLink: [{ to: "/admin/weeklydetailsreport", label: "Weekly Details Reports" }],
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

export default AdminLayout;