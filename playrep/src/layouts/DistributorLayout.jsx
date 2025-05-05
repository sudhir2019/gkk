import { Outlet } from "react-router-dom";
import Navbar from "../components/layoutsComponents/Navbar";
import Footer from "../components/layoutsComponents/Footer";
import { useSelector } from "react-redux";
function DistributorLayout() {
    const { authUser } = useSelector((state) => state.auth);
    const menuItems = [
        {
            navLink: [{ to: "/areamanager/reports/pointtransfer", label: "Reports" }],
            links: [
                { to: "/areamanager/reports/revenue", label: "Revenue" },
                { to: "/areamanager/reports/pokerrevenue", label: "Poker Revenue" },
                { to: "/areamanager/reports/pointtransfer", label: "Point Transfer" },
                { to: "/areamanager/reports/multipointtransfer", label: "Multiplayer Point Transfer" },
                { to: "/areamanager/reports/dailystatus", label: "Daily Status" },
                { to: "/areamanager/reports/agentdetails", label: "Agent Details" },
                { to: "/areamanager/reports/revenuerecovery", label: "Revenue Recovery" },
                { to: "/areamanager/reports/computerloan", label: "Computer Loan" },
                { to: "/areamanager/reports/multiplecybers", label: "Multiple Cybers" },
                { to: "/areamanager/reports/nonperfomeragent", label: "Non Performer Agent" },
                { to: "/areamanager/reports/agenstatus", label: "Agent Status" },
                { to: "/areamanager/reports/balancereport", label: "Balance Report" },

            ],
        },
        {
            navLink: [{ to: "/areamanager/drawdetails/funtarget", label: "Draw Details" }],
            links: [
                { to: "/areamanager/drawdetails/funtarget/MNOQqWWi", label: "Fun Target" },
                { to: "/areamanager/drawdetails/funroullet/vwRORrGO", label: "Fun Roullet" },
                { to: "/areamanager/drawdetails/triplefun/zuuhVbBM", label: "Triple Fun" },
                { to: "/areamanager/drawdetails/funab/qZicXikM", label: "Fun AB" },
            ],
        },
        {
            navLink: [{ to: "/areamanager/mailreports/managermaildetails", label: "Mail Report" }],
        },
        // {
        //     navLink: [{ to: "/areamanager/weeklydetailsreport", label: "Weekly Details Reports" }],
        // }
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
export default DistributorLayout;