import { Outlet } from "react-router-dom";
import Navbar from "../components/layoutsComponents/Navbar";
import Footer from "../components/layoutsComponents/Footer";
import { useSelector } from "react-redux";

function SuperDistributorLayout() {
    const { authUser } = useSelector((state) => state.auth);
    const menuItems = [
        {
            navLink: [{ to: "/superareamanager/reports/pointtransfer", label: "Reports" }],
            links: [
                { to: "/superareamanager/reports/revenue", label: "Revenue" },
                { to: "/superareamanager/reports/pokerrevenue", label: "Poker Revenue" },
                { to: "/superareamanager/reports/pointtransfer", label: "Point Transfer" },
                { to: "/superareamanager/reports/multipointtransfer", label: "Multiplayer Point Transfer" },
                { to: "/superareamanager/reports/dailystatus", label: "Daily Status" },
                { to: "/superareamanager/reports/agentdetails", label: "Agent Details" },
                { to: "/superareamanager/reports/revenuerecovery", label: "Revenue Recovery" },
                { to: "/superareamanager/reports/computerloan", label: "Computer Loan" },
                { to: "/superareamanager/reports/multiplecybers", label: "Multiple Cybers" },
                { to: "/superareamanager/reports/nonperfomeragent", label: "Non Performer Agent" },
                { to: "/superareamanager/reports/agenstatus", label: "Agent Status" },
                { to: "/superareamanager/reports/balancereport", label: "Balance Report" },

            ],
        },
        {
            navLink: [{ to: "/superareamanager/drawdetails/funtarget", label: "Draw Details" }],
            links: [
                { to: "/superareamanager/drawdetails/funtarget/MNOQqWWi", label: "Fun Target" },
                { to: "/superareamanager/drawdetails/funroullet/vwRORrGO", label: "Fun Roullet" },
                { to: "/superareamanager/drawdetails/triplefun/zuuhVbBM", label: "Triple Fun" },
                { to: "/superareamanager/drawdetails/funab/qZicXikM", label: "Fun AB" },
            ],
        },
        {
            navLink: [{ to: "#", label: "Mail Report" }],
            links: [
                { to: "/superareamanager/mailreports/managermaildetails ", label: "Manager Mail Details" },
            ],
        },
        {
            navLink: [{ to: "/superareamanager/weeklydetailsreport", label: "Weekly Details Reports" }],
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

export default SuperDistributorLayout;