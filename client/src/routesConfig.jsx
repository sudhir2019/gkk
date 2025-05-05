import SuperAdminDashboard from "./pages/DashboardPages/Dashboard/SuperAdminDashboard";
import AdminDashboard from "./pages/DashboardPages/Dashboard/AdminDashboard";
import SuperDistibutorDashboard from "./pages/DashboardPages/Dashboard/SuperDistibutorDashboard";
import DistibutorDashboard from "./pages/DashboardPages/Dashboard/DistibutorDashboard";
import RetailerDashboard from "./pages/DashboardPages/Dashboard/RetailerDashboard";

import Admin from "./pages/DashboardPages/Users/Admin";
import SuperDistributor from "./pages/DashboardPages/Users/SuperDistributor";
import Distributor from "./pages/DashboardPages/Users/Distributor";
import Retailer from "./pages/DashboardPages/Users/Retailer";
import Users from "./pages/DashboardPages/Users/Users";

import Gift from "./pages/DashboardPages/Users/Gift";
import Loan from "./pages/DashboardPages/Users/Loan";
import Otc from "./pages/DashboardPages/Users/Otc";

import Game from "./pages/DashboardPages/Game/Game";
import GameMaster from "./pages/DashboardPages/Game/GameMaster";
import OnlinePlayers from "./pages/DashboardPages/Game/OnlinePlayers";
import GameHistory from "./pages/DashboardPages/Game/GameHistory";
import WinPercentage from "./pages/DashboardPages/Game/WinPercentage";

import TurnOverReport from "./pages/DashboardPages/Report/TurnOverReport";
import TransactionReport from "./pages/DashboardPages/Report/TransactionReport";
import CommissionPayout from "./pages/DashboardPages/Report/CommissionPayout";
import AdminCommissionReport from "./pages/DashboardPages/Report/AdminCommissionReport";

import LogActivities from "./pages/DashboardPages/Users/LogActivities";
import Profile from "./pages/DashboardPages/AuthUser/Profile";
import AdminDetails from "./pages/DashboardPages/Details/AdminDetails";
import SuperDistributorDetails from "./pages/DashboardPages/Details/SuperDistributorDetails";
import DistributorDetails from "./pages/DashboardPages/Details/DistributorDetails";
import RetailerDetails from "./pages/DashboardPages/Details/RetailerDetails";
import TimeMaster from "./pages/DashboardPages/Game/TimeMaster";
import ContactUs from "./pages/DashboardPages/ContactUs/ContactUs";
import FunTarget from "./pages/DashboardPages/Game/FunTarget";
import FunRoullet from "./pages/DashboardPages/Game/FunRoullet";


const createRoute = (path, element) => {
    return [
        { path, element },
        { path: `${path}/:action`, element },
        { path: `${path}/:action/:any`, element },
        { path: `${path}/details/:any`, element },
        { path: `${path}/details/:any/:action`, element },
        { path: `${path}/details/:any/:action/:id`, element },
        { path: `${path}/:any/:action/:id`, element },
        { path: `${path}/game/:gameId/:adminId/:username`, element }
    ];
};

// Role-Based Routes
const roleBasedRoutes = {
    superadmin: [
        ...createRoute("dashboard", <SuperAdminDashboard />),
        ...createRoute("timemaster", <TimeMaster />),
        ...createRoute("gamemaster", <GameMaster />),
        ...createRoute("admin", <Admin />),
        ...createRoute("superareamanager", <SuperDistributor />),
        ...createRoute("areamanager", <Distributor />),
        ...createRoute("master", <Retailer />),
        ...createRoute("player", <Users />),
        ...createRoute("gift", <Gift />),
        ...createRoute("loan", <Loan />),
        ...createRoute("otc", <Otc />),
        ...createRoute("game", <Game />),
        ...createRoute("admin/players", <AdminDetails />),
        ...createRoute("superareamanager/players", <SuperDistributorDetails />),
        ...createRoute("areamanager/players", <DistributorDetails />),
        ...createRoute("master/players", <RetailerDetails />),
        ...createRoute("player/players", <GameHistory />),
        { path: "onlineplayers", element: <OnlinePlayers /> },
        { path: "gamehistory", element: <GameHistory /> },
        { path: "winpercentage", element: <WinPercentage /> },
        { path: "turnoverreport", element: <TurnOverReport /> },
        { path: "transactionreport", element: <TransactionReport /> },
        { path: "commissionpayoutReport", element: <CommissionPayout /> },
        { path: "admincommissionreport", element: <AdminCommissionReport /> },
        { path: "logactivities", element: <LogActivities /> },
        { path: "contactus", element: <ContactUs /> },
        { path: "profile", element: <Profile /> },

    ],
    admin: [
        ...createRoute("dashboard", <AdminDashboard />),
        ...createRoute("superareamanager", <SuperDistributor />),
        ...createRoute("areamanager", <Distributor />),
        ...createRoute("master", <Retailer />),
        ...createRoute("player", <Users />),
        ...createRoute("gift", <Gift />),
        ...createRoute("loan", <Loan />),
        ...createRoute("otc", <Otc />),
        ...createRoute("game", <Game />),
        ...createRoute("superareamanager/players", <SuperDistributorDetails />),
        ...createRoute("areamanager/players", <DistributorDetails />),
        ...createRoute("master/players", <RetailerDetails />),
        ...createRoute("player/players", <GameHistory />),

        { path: "onlineplayers", element: <OnlinePlayers /> },
        { path: "gamehistory", element: <GameHistory /> },
        { path: "winpercentage", element: <WinPercentage /> },
        { path: "turnoverreport", element: <TurnOverReport /> },
        { path: "transactionreport", element: <TransactionReport /> },
        { path: "commissionpayoutReport", element: <CommissionPayout /> },
        { path: "admincommissionreport", element: <AdminCommissionReport /> },
        { path: "logactivities", element: <LogActivities /> },
        { path: "contactus", element: <ContactUs /> },
        { path: "profile", element: <Profile /> },
        
        { path: "funtarget", element: <FunTarget /> },
        { path: "funroullet", element: <FunRoullet /> },
    ],
    superareamanager: [
        ...createRoute("dashboard", <SuperDistibutorDashboard />),
        ...createRoute("areamanager", <Distributor />),
        ...createRoute("master", <Retailer />),
        ...createRoute("player", <Users />),
        ...createRoute("areamanager/players", <DistributorDetails />),
        ...createRoute("master/players", <RetailerDetails />),
        ...createRoute("player/players", <GameHistory />),
        { path: "onlineplayers", element: <OnlinePlayers /> },
        { path: "gamehistory", element: <GameHistory /> },
        { path: "winpercentage", element: <WinPercentage /> },
        { path: "turnoverreport", element: <TurnOverReport /> },
        { path: "transactionreport", element: <TransactionReport /> },
        { path: "commissionpayoutReport", element: <CommissionPayout /> },
        { path: "logactivities", element: <LogActivities /> },
        { path: "profile", element: <Profile /> },
    ],
    areamanager: [
        ...createRoute("dashboard", <DistibutorDashboard />),
        ...createRoute("master", <Retailer />),
        ...createRoute("player", <Users />),
        ...createRoute("master/players", <RetailerDetails />),
        ...createRoute("player/players", <GameHistory />),

        { path: "onlineplayers", element: <OnlinePlayers /> },
        { path: "gamehistory", element: <GameHistory /> },
        { path: "winpercentage", element: <WinPercentage /> },
        { path: "turnoverreport", element: <TurnOverReport /> },
        { path: "transactionreport", element: <TransactionReport /> },
        { path: "commissionpayoutReport", element: <CommissionPayout /> },
        { path: "logactivities", element: <LogActivities /> },
        { path: "profile", element: <Profile /> },
    ],
    master: [
        ...createRoute("dashboard", <RetailerDashboard />),
        ...createRoute("player", <Users />),
        ...createRoute("player/players", <GameHistory />),
        { path: "onlineplayers", element: <OnlinePlayers /> },
        { path: "gamehistory", element: <GameHistory /> },
        { path: "winpercentage", element: <WinPercentage /> },
        { path: "turnoverreport", element: <TurnOverReport /> },
        { path: "transactionreport", element: <TransactionReport /> },
        { path: "commissionpayoutReport", element: <CommissionPayout /> },
        { path: "logactivities", element: <LogActivities /> },
        { path: "profile", element: <Profile /> },
    ],
};

export default roleBasedRoutes;