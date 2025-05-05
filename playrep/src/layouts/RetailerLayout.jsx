import { Outlet } from "react-router-dom";
import Navbar from "../components/layoutsComponents/Navbar";
import Footer from "../components/layoutsComponents/Footer";
import { useSelector } from "react-redux";
function RetailerLayout() {
    const { authUser } = useSelector((state) => state.auth);
    const menuItems = [
        {
            navLink: [{ to: "/master/reports/pointtransfer", label: "Reports" }],
            links: [
                { to: "/master/reports/revenue", label: "Revenue" },
                { to: "/master/reports/pokerrevenue", label: "Poker Revenue" },
                { to: "/master/reports/pointtransfer", label: "Point Transfer" },
                { to: "/master/reports/multipointtransfer", label: "Multiplayer Point Transfer" },
                { to: "/master/reports/dailystatus", label: "Daily Status" },
                // { to: "/master/reports/agentdetails", label: "Agent Details" },
                // { to: "/master/reports/revenuerecovery", label: "Revenue Recovery" },
                // { to: "/master/reports/computerloan", label: "Computer Loan" },
                // { to: "/master/reports/multiplecybers", label: "Multiple Cybers" },
                // { to: "/master/reports/nonperfomeragent", label: "Non Performer Agent" },
                // { to: "/master/reports/agenstatus", label: "Agent Status" },
                // { to: "/master/reports/balancereport", label: "Balance Report" },

            ],
        },
        {
            navLink: [{ to: "/master/drawdetails/funtarget", label: "Draw Details" }],
            links: [
                { to: "/master/drawdetails/funtarget/MNOQqWWi", label: "Fun Target" },
                { to: "/master/drawdetails/funroullet/vwRORrGO", label: "Fun Roullet" },
                { to: "/master/drawdetails/triplefun/zuuhVbBM", label: "Triple Fun" },
                { to: "/master/drawdetails/funab/qZicXikM", label: "Fun AB" },
            ],
        },
        {
            navLink: [{ to: "/master/mailreports/managermaildetails", label: "Mail Report" }],
            links: [
                { to: "/master/mailreports/agentmaildetails ", label: "Agent Mail Details" },
            ],
        },
        {
            navLink: [{ to: "/master/weeklydetailsreport", label: "Weekly Details Reports" }],
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

export default RetailerLayout;