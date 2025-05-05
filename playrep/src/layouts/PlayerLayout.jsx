import { Outlet } from "react-router-dom";
import Navbar from "../components/layoutsComponents/Navbar";
import Footer from "../components/layoutsComponents/Footer";
import { useSelector } from "react-redux";

function PlayerLayout() {
    const { authUser } = useSelector((state) => state.auth);
    const menuItems = [
        {
            navLink: [{ to: "/player/reports", label: "Reports" }],
            links: [
                { to: "/player/pointtransfer", label: "Point Transfer" },
                { to: "/player/multipointtransfer", label: "Multipoint Transfer" },
            ],
        },
        {
            navLink: [{ to: "/player/drawdetails/funtarget", label: "Draw Details" }],
            links: [
                { to: "/player/drawdetails/funtarget/MNOQqWWi", label: "Fun Target" },
                { to: "/player/drawdetails/funroullet/vwRORrGO", label: "Fun Roullet" },
                { to: "/player/drawdetails/triplefun/zuuhVbBM", label: "Triple Fun" },
                { to: "/player/drawdetails/funab/qZicXikM", label: "Fun AB" },
            ],
        },
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

export default PlayerLayout;